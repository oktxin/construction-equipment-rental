import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { selectAuth, selectIsAuthenticated } from "../../auth/authSlice";
import { addFavorite, checkFavorite, removeFavorite } from "../../favorites/favoritesApi";
import { useAppSelector } from "../../../shared/hooks/redux";
import { Button } from "../../../shared/ui";
import { getErrorMessage, isUnauthorizedError } from "../../../shared/utils/errorMessage";

type FavoriteButtonProps = {
  equipmentId: string;
  className?: string;
};

export function FavoriteButton({
  equipmentId,
  className,
}: FavoriteButtonProps) {
  const auth = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.isInitialized || !isAuthenticated) {
      setIsFavorite(false);
      setIsChecking(false);
      return;
    }

    let isActive = true;

    const loadFavoriteState = async () => {
      setIsChecking(true);
      setError(null);

      try {
        const data = await checkFavorite(equipmentId);
        if (!isActive) {
          return;
        }

        setIsFavorite(data.isFavorite);
      } catch (requestError) {
        if (!isActive) {
          return;
        }

        setError(getErrorMessage(requestError));
      } finally {
        if (isActive) {
          setIsChecking(false);
        }
      }
    };

    void loadFavoriteState();

    return () => {
      isActive = false;
    };
  }, [auth.isInitialized, equipmentId, isAuthenticated]);

  const redirectToLogin = () => {
    navigate("/login", {
      state: {
        from: {
          pathname: location.pathname,
          search: location.search,
          hash: location.hash,
        },
      },
    });
  };

  const handleClick = async () => {
    if (!auth.isInitialized || auth.isLoading || isChecking || isSubmitting) {
      return;
    }

    if (!isAuthenticated) {
      redirectToLogin();
      return;
    }

    const previousState = isFavorite;
    const nextState = !isFavorite;

    setError(null);
    setIsSubmitting(true);
    setIsFavorite(nextState);

    try {
      if (nextState) {
        await addFavorite(equipmentId);
      } else {
        await removeFavorite(equipmentId);
      }
    } catch (requestError) {
      setIsFavorite(previousState);

      if (isUnauthorizedError(requestError)) {
        redirectToLogin();
        return;
      }

      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const label = isChecking
    ? "Проверяем..."
    : isSubmitting
      ? isFavorite
        ? "Добавляем..."
        : "Удаляем..."
      : isFavorite
        ? "В избранном"
        : "В избранное";

  return (
    <div className={className}>
      <Button
        type="button"
        variant={isFavorite ? "secondary" : "ghost"}
        className="w-full justify-center"
        onClick={handleClick}
        disabled={!auth.isInitialized || auth.isLoading || isChecking || isSubmitting}
        aria-label={label}
      >
        {label}
      </Button>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
    </div>
  );
}
