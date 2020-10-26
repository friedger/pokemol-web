import React, { useContext, useState } from 'react';
import { Button, Box, Flex, Text, Grid } from '@chakra-ui/core';

import { PokemolContext } from '../../contexts/PokemolContext';
import BrandOverride from '../../assets/themes/raidTheme/raidguild__avatar--pink.jpg';
import { HUB_MEMBERSHIPS } from '../../utils/apollo/hub-queries';
import GraphFetch from '../../components/Shared/GraphFetch';
import MemberDaoList from '../../components/Hub/MemberDaoList';
import HubSignedOut from '../../components/Hub/HubSignedOut';
import HubProfileCard from '../../components/Hub/HubProfileCard';
import HubActivityFeed from '../../components/Hub/HubActivityFeed';

const Hub = () => {
  const { state, dispatch } = useContext(PokemolContext);
  const [memberDaos, setMemberDaos] = useState();

  const setTheme = () => {
    dispatch({
      type: 'setTheme',
      payload: {
        brand50: '#ff4d74',
        brand100: '#ff4d74',
        brand200: '#ff4d74',
        brand300: '#ff4d74',
        brand400: '#fe1d5b',
        brand500: '#e50651',
        brand600: '#e50651',
        brand700: '#e50651',
        brand800: '#e50651',
        brand900: '#e50651',
        brandImg: BrandOverride,
        bg400: '#000',
      },
    });
  };

  const setDefault = () => {
    dispatch({
      type: 'clearTheme',
    });
  };

  return (
    <Box p={6}>
      <Flex w="100%">
        <Button onClick={setTheme}> PRETEND DAO BUTTON</Button>
        <Button onClick={setDefault}> DEFAULT</Button>
      </Flex>

      {state.user ? (
        <>
          <Grid gap={6} templateColumns="repeat(2, 1fr)">
            <Box
              rounded="lg"
              bg="blackAlpha.600"
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              p={6}
              mt={6}
              w="100%"
            >
              <HubProfileCard />

              {memberDaos ? (
                <MemberDaoList
                  daos={memberDaos.members.map((member) => member.moloch)}
                />
              ) : null}
            </Box>

            <Box
              rounded="lg"
              bg="blackAlpha.600"
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              p={6}
              mt={6}
              w="100%"
            >
              <Text fontSize="xl">Recent Activity</Text>
              {memberDaos ? (
                <HubActivityFeed
                  daos={memberDaos.members.map((member) => member.moloch)}
                />
              ) : null}
            </Box>
          </Grid>

          <GraphFetch
            query={HUB_MEMBERSHIPS}
            setRecords={setMemberDaos}
            entity="members"
            variables={{ memberAddress: state.user.username }}
          />
        </>
      ) : (
        <HubSignedOut />
      )}
    </Box>
  );
};

export default Hub;