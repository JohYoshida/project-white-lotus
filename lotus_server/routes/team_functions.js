// Takes a collection of teamMonster models with related monsters and team.
// Each teamColection represents a single team.
const formatTeam = (teamCollection) => {
  const monsterModels = teamCollection.models;
  if(monsterModels.length < 3 ) return null;
  // The name and ID of the team. All monster will be on the same team, so doesn't matter
  // which monster we look at for this information.
  const id = monsterModels[0].get('team_id');
  const name = monsterModels[0].related('team').get('name');
  const teamMembers = monsterModels.map(teamMember => {
    return teamMember.getMonster();
  });
  return {id, name, teamMembers};
};

module.exports = formatTeam;
