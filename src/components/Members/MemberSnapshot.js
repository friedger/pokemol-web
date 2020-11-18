import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Skeleton } from '@chakra-ui/core';

import { useMembers, useDao, useUser } from '../../contexts/PokemolContext';
import { useTheme } from '../../contexts/CustomThemeContext';
import MemberSnapshotChart from './MemberSnapshotChart';
import TextBox from '../Shared/TextBox';
import ContentBox from '../Shared/ContentBox';

const MemberSnapshot = ({ selectedMember }) => {
  const [theme] = useTheme();
  const [dao] = useDao();
  const [members] = useMembers();
  const [user] = useUser();

  return (
    <Box>
      <Flex justify='space-between'>
        <TextBox>Snapshot</TextBox>
        <TextBox
          as={Link}
          to={`/dao/${dao?.address}/profile/${
            selectedMember ? selectedMember.memberAddress : user?.username
          }`}
        >
          View my profile
        </TextBox>
      </Flex>
      <ContentBox mt={3}>
        <Flex justify='space-between'>
          <Box>
            <TextBox>{theme.daoMeta.members}</TextBox>
            <Skeleton isLoaded={members.length > 0}>
              <TextBox variant='value'>{members?.length}</TextBox>
            </Skeleton>
          </Box>
          <Box>
            <TextBox>Shares</TextBox>
            <Skeleton isLoaded={dao?.graphData?.totalShares}>
              <TextBox variant='value'>
                {dao?.graphData?.totalShares
                  ? dao?.graphData?.totalShares
                  : '--'}
              </TextBox>
            </Skeleton>
          </Box>
          {(dao?.graphData?.totalLoot > 0 || !dao?.graphData?.totalLoot) && (
            <Box>
              <TextBox>Loot</TextBox>
              <Skeleton isLoaded={dao?.graphData?.totalLoot}>
                <TextBox variant='value'>
                  {dao?.graphData?.totalLoot ? dao?.graphData?.totalLoot : '--'}
                </TextBox>
              </Skeleton>
            </Box>
          )}
        </Flex>
        <Flex justify='center' mt={4}>
          <MemberSnapshotChart />
        </Flex>
      </ContentBox>
    </Box>
  );
};

export default MemberSnapshot;