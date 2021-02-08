import React from "react";
import ImmunizationsTable from "../Tables/ExtendedTable/components/ImmunizationsTable";
import { Container } from "./../../components";
import { HeaderMain } from "./../components/HeaderMain";

const Immunizations = () => {
  return (
    <Container>
      <HeaderMain title="Immunizations" className="mb-5 mt-4" />
      <ImmunizationsTable />
    </Container>
  );
};

export default Immunizations;
