/**
 * Utility function to generate a standardized success response.
 *
 * This is used across the application to ensure all successful API responses
 * follow a consistent structure defined by the `IResponse` interface.
 *
 * @param {Object} params - Object containing message and optional data.
 * @param {string} params.message - A message describing the success action (e.g., "Exam created successfully").
 * @param {any} [params.data] - Optional payload returned with the response. Can be any type or null.
 *
 * @returns {IResponse} A standardized success response object.
 *
 * @example
 * return successResponse({ message: 'User created', data: createdUser });
 */
export function successResponse({
  message,
  data,
}: {
  message: string;
  data?: any;
}): IResponse {
  return {
    success: true,
    message,
    data,
  };
}


/**
 * Standard interface for API responses.
 * 
 * This structure is used to return a consistent response format across all endpoints.
 */
export interface IResponse {
  /**
   * Indicates whether the operation was successful.
   * - `true` if the request was handled successfully.
   * - `false` if an error occurred.
   */
  success: boolean;

  /**
   * A descriptive message providing additional context about the result of the operation.
   * 
   * For example:
   * - `"Exam created successfully"` for successful actions.
   * - `"Invalid exam ID"` for errors.
   */
  message: string;

  /**
   * The actual response payload.
   * 
   * - Can be `null` or `undefined` if there’s no data to return.
   * - The structure depends on the specific endpoint.
   * 
   * Examples:
   * - A created user object.
   * - An array of exams.
   * - A single exam result.
   */
  data?: any;
}