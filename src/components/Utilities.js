export const getIcon = (area) => {
  switch (area) {
    case 'click':
    return 'tabler:click';
    case 'foamfinger':
      return 'tabler:hand-finger';
    case 'motivationPoster':
      return 'akar-icons:paper';
    case 'selfHelpBook':
      return 'material-symbols:book';
    case 'meditationGuide':
      return 'mdi:tape';
    case 'yogaMat':
      return 'tabler:yoga';
    case 'energyDrink':
      return 'game-icons:soda-can';
    case 'influencerCourse':
      return 'material-symbols:person';
    case 'motivation':
   return'mdi:megaphone-outline';
   case 'inspiration':
   return 'mdi:thought-bubble';
   case 'creativity':
   return 'bi:easel';
   case 'knowledge':
   return 'mdi:brain';
    case 'social':
   return 'la:user-friends';
    case 'writing':
   return 'tabler:writing';
    case 'money':
   return 'tabler:pig-money';
    default:
      return null;
  }
};