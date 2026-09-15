import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ProfileSettings is a legacy route — the real settings page is Settings.jsx.
 * Redirect transparently so no user lands on a dead page.
 */
export default function ProfileSettings() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard/settings", { replace: true });
  }, [navigate]);
  return null;
}
