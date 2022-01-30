import { ApolloClient, gql } from "@apollo/client";
import { Dispatch } from "react";

const initialState = {
  count: 0,
};

const LOADED_CART_COUNT = "LOADED_CART_COUNT";

export default function reducer(
  state = initialState,
  action: { type: any; count: number }
) {
  switch (action.type) {
    case LOADED_CART_COUNT:
      return { ...state, count: action.count };
    default:
      return state;
  }
}

export const getCartCount =
  (client: ApolloClient<any>, customerId: string) =>
  async (dispatch: Dispatch<{}>) => {
    const getCartQuery = gql`
      query CartItemCount($customerId: String!) {
        cartItemsCount(customerid: $customerId)
      }
    `;
    try {
      const { data } = await client.query({
        query: getCartQuery,
        variables: { customerId },
      });

      dispatch({
        type: LOADED_CART_COUNT,
        count: data.cartItemsCount,
      });
    } catch (error) {}
  };
