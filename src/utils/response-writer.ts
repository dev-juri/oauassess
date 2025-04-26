export function successResponse({
  message,
  data,
}: {
  message: string;
  data?: any;
}) {
  return {
    success: true,
    message,
    data,
  };
}
