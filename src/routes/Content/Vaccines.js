import React from "react";
import VaccinesTable from "./../Tables/ExtendedTable/components/VaccinesTable";
import { Container } from "./../../components";
import { HeaderMain } from "./../components/HeaderMain";

const Vaccines = () => {
  return (
    <Container>
      <HeaderMain title="Vaccines" className="mb-5 mt-4" />
      <VaccinesTable />
    </Container>
  );
};

export default Vaccines;
