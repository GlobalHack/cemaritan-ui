import React from "react";
import styled from "styled-components";
import { IPageAction } from "./types";
import { PageAction } from "./PageAction";

interface PageProps {
  title: string;
  actions?: IPageAction[];
}

const Page: React.FC<PageProps> = ({ title, actions, children }) => {
  return (
    <PageWrapper>
      <TitleBar>
        <h1>{title}</h1>
        {actions && (
          <PageActions>
            {actions.map((action) => (
              <PageAction key={action.id} action={action} />
            ))}
          </PageActions>
        )}
      </TitleBar>
      <div>{children}</div>
    </PageWrapper>
  );
};

const TitleBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageActions = styled.div`
    display; flex;
    align-items: center;
    justify-content: flex-end;

    & > * + * {
        margin-left: 1rem;
    }
`;

const PageWrapper = styled.div`
  margin: 1rem 5%;
`;

export default Page;
