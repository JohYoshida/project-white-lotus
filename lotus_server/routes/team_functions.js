// Takes a collection of teamMonster models with related monsters and formats them.
const formatTeam = (teamCollection) => {
  const team = teamCollection.models;
  if(team.length < 3 ) return null;
  const id = team[0].get('team_id');
  // const name = team[0].get('name');
  const teamMembers = team.map(teamMember => {
    return teamMember.getMonster();
  });
  return {id, teamMembers};
};

module.exports = formatTeam;
