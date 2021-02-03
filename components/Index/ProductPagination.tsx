import { useRouter } from "next/router";
import { useCallback } from "react";
import { Container, Pagination, PaginationProps } from "semantic-ui-react";
import { Routes } from "../../utils/routes";

type Props = {
  totalPages: number
};

function ProductPagination({ totalPages }: Props): JSX.Element {
  const router = useRouter();
  const handlePageChange = useCallback(
    (_event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
      data.activePage === 1 ?
        router.push(Routes.Home)
        : router.push(`${Routes.Home}?page=${data.activePage}`)
    }, []);

  return (
    <Container textAlign="center" style={{ margin: "2em" }}>
      <Pagination
        defaultActivePage={1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}

export default ProductPagination;
