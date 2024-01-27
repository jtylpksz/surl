export const sendErrorToClient = (
  message: string
): { ok: boolean; message: string } => {
  return {
    ok: false,
    message,
  };
};
