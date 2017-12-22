// Takes a collection of teamMonster models with related monsters and formats them.
const formatTeam = (teamCollection) => {
  const team = teamCollection.models;
  if(team.length < 3 ) return null;
  const teamId = team[0].get('team_id');
  const teamMembers = team.map(teamMember => {
    return teamMember.getMonster();
  });
  return {teamId, teamMembers};
};

module.exports = formatTeam;
