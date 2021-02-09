import React from "react";
import ProvidersTable from "./../Tables/ExtendedTable/components/ProvidersTable";
import { Container } from "./../../components";
import { HeaderMain } from "./../components/HeaderMain";

const Providers = () => {
    return (
        <Container>
            <HeaderMain title="Providers" className="mb-5 mt-4" />
            <ProvidersTable />
        </Container>
    );
};

export default Providers;
