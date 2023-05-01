import Grid from "../../components/grid";
import Flex from "../../components/flex/Flex";
import { RepositoryList } from "./repository/RepositoryList";
import ProfilesList from "./profiles/ProfilesList";
import { IssuesList } from "./issues/IssuesList";
import SearchProfiles from "./searchProfiles/SearchProfiles";

const Section = ({ sectionList, gridArea }: { text: string, sectionList: React.ReactElement, gridArea: string }) => {
  return (
    <Flex direction="column" css={{
      gap: "1rem",
      gridArea: gridArea,
      overflow: "hidden"
    }}>
      
      <Flex css={{
        maxWidth: "calc(100vw - 2.5rem)",
        "@xl": {
          maxWidth: "1024px",
        },
        overflow: "scroll"
      }}>{sectionList}</Flex>
    </Flex>    
  );
};

const Dashboard = () => {
  return (
    <Flex direction="column" css={{
      minWidth: "280px",
      alignItems: "center",
      padding: "1rem",
      "@sm": {
        padding: "1rem 3rem",
      },
      maxWidth: "1024px",
      margin: "0 auto",
    }}>
      <Grid css={{
        padding: "0.75rem",
        width: "$full",
        gap: "2rem",
        gridTemplateAreas: "\"search search\" \"profiles-list profiles-list\" \"repositories-list repositories-list\" \"issues-list issues-list\"",
        "@xl": {
          gridTemplateAreas: "\"search search\" \"profiles-list repositories-list\" \"profiles-list issues-list\"",
        }
      }}>
        <SearchProfiles gridArea='search' />
        <Section text="Profiles" gridArea='profiles-list' sectionList={<ProfilesList />} />
        <Section text="Repositories" gridArea='repositories-list' sectionList={<RepositoryList />} />
        <Section text="Issues" gridArea='issues-list' sectionList={<IssuesList />} />
      </Grid>
    </Flex>
  );
};

export default Dashboard;
  