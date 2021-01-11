import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      rating
      description_intro
    }
  }
`;

export default () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  console.log(loading, data, error);
  return "D";
};
