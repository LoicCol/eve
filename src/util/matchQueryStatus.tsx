import { type UseQueryResult } from "@tanstack/react-query";

/**
 * Match the state of a query to a set of components.
 *
 * Useful for rendering different UI based on the state of a query.
 *
 * **Note:** if you don't provide an `Empty` component and the query is empty,
 * the data in the Success component will be also typed as undefined.
 * @example ```jsx
 * const query = useQuery({... });
 * return matchQueryStatus(query, {
 *   Loading: <Loading />,
 *   Errored: <Errored />,
 *   Success: ({ data }) => <Data data={data} />
 *   //          ^ type of T | null
 * })
 * ```
 * If you provide an `Empty` component, the data will be typed as non-nullable.
 * @example ```jsx
 * const query = useQuery({... });
 *
 * return matchQueryStatus(query, {
 *    Loading: <Loading />,
 *    Errored: <Error />,
 *    Empty: <Empty />,
 *    Success: ({ data }) => <Data data={data} />,
 *    //          ^ type of data is T
 * );
 * ```
 */
export function matchQueryStatus<T>(
  query: UseQueryResult<T>,
  options: {
    Loading: JSX.Element;
    Errored: JSX.Element | ((error: unknown) => JSX.Element);
    Empty: JSX.Element;
    Success: (
      data: UseQueryResult<T> & {
        data: NonNullable<UseQueryResult<T>["data"]>;
      },
    ) => JSX.Element;
  },
): JSX.Element;
export function matchQueryStatus<T>(
  query: UseQueryResult<T>,
  options: {
    Loading: JSX.Element;
    Errored: JSX.Element | ((error: unknown) => JSX.Element);
    Success: (data: UseQueryResult<T>) => JSX.Element;
  },
): JSX.Element;
export function matchQueryStatus<T>(
  query: UseQueryResult<T>,
  {
    Loading,
    Errored,
    Empty,
    Success,
  }: {
    Loading: JSX.Element;
    Errored: JSX.Element | ((error: unknown) => JSX.Element);
    Empty?: JSX.Element;
    Success: (data: UseQueryResult<T>) => JSX.Element;
  },
): JSX.Element {
  if (query.isLoading) {
    return Loading;
  }

  if (query.isError) {
    if (typeof Errored === "function") {
      return Errored(query.error);
    }
    return Errored;
  }

  const isEmpty =
    query.data === undefined ||
    query.data === null ||
    (Array.isArray(query.data) && query.data.length === 0);

  if (isEmpty && Empty) {
    return Empty;
  }

  return Success(query);
}
