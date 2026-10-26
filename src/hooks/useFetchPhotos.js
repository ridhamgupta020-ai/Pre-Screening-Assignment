import { useEffect, useState } from "react";

const PHOTOS_API = "https://picsum.photos/v2/list?limit=30";

/**
 * Fetches the first 30 photos from Picsum.
 * @returns {{ photos: Array, loading: boolean, error: string }}
 */
export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPhotos() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(PHOTOS_API, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`The photo service returned an error (${response.status}).`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("The photo service returned an unexpected response.");
        }

        setPhotos(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load photos. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPhotos();
    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}
