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
export  const buyItem = (itemType, stats,purchaseQuantity,setStats) => {
    const currentPrice = calculatePrice(itemType);
    if (stats.motivation >= currentPrice  && purchaseQuantity !== 'MAX') {
      setStats(prevStats => ({
        ...prevStats,
        motivation: prevStats.motivation - currentPrice,
        [itemType]: prevStats[itemType] + purchaseQuantity,
      }));
    }else if (stats.motivation >= currentPrice && purchaseQuantity === 'MAX') {
      setStats(prevStats => ({
        ...prevStats,
        motivation: prevStats.motivation - currentPrice,
        [itemType]: prevStats[itemType] + calculateMax(itemType,stats),
      }));
    } else {

    }
  };

  export const calculatePrice = (itemType,purchaseQuantity,stats) => {
  let basePrice, increaseRate;
  switch (itemType) {
    case 'foamfinger':
      basePrice = 50;
      increaseRate = 1.01;
      break;
    case 'motivationPoster':
      basePrice = 30;
      increaseRate = 1.07;
      break;
    case 'selfHelpBook':
      basePrice = 500;
      increaseRate = 1.06;
      break;
    case 'meditationGuide':
      basePrice = 1000;
      increaseRate = 1.05;
      break;
    case 'yogaMat':
      basePrice = 1500;
      increaseRate = 1.05;
      break;
    case 'energyDrink':
      basePrice = 2000;
      increaseRate = 1.05;
      break;
    case 'influencerCourse':
      basePrice = 2500;
      increaseRate = 1.05;
      break;
    default:
      basePrice = 0;
      increaseRate = 1;
  }

  if (purchaseQuantity === 'MAX') {
    let totalPrice = 0;
    let remainingMotivation = stats.motivation;
    let itemQuantity = stats[itemType];
    while (remainingMotivation >= basePrice) {
      const price = basePrice * Math.pow(increaseRate, itemQuantity);
      if (price <= remainingMotivation) {
        totalPrice += Math.round(price);
        remainingMotivation -= price;
        itemQuantity++;
      } else {
        break;
      }
    }
    return totalPrice;
  } else {
    let totalPrice = 0;
    for (let i = 0; i < purchaseQuantity; i++) {
      const itemQuantity = stats[itemType] + i;
      const price = basePrice * Math.pow(increaseRate, itemQuantity);
      totalPrice += Math.round(price);
    }
    return totalPrice;
    }
};

 export const calculateMax = (itemType,stats) => {
  let basePrice, increaseRate;
  switch (itemType) {
    case 'foamfinger':
      basePrice = 50;
      increaseRate = 1.01;
      break;
    case 'motivationPoster':
      basePrice = 30;
      increaseRate = 1.07;
      break;
    case 'selfHelpBook':
      basePrice = 500;
      increaseRate = 1.06;
      break;
    case 'meditationGuide':
      basePrice = 1000;
      increaseRate = 1.05;
      break;
    case 'yogaMat':
      basePrice = 1500;
      increaseRate = 1.05;
      break;
    case 'energyDrink':
      basePrice = 2000;
      increaseRate = 1.05;
      break;
    case 'influencerCourse':
      basePrice = 2500;
      increaseRate = 1.05;
      break;
    default:
      basePrice = 0;
      increaseRate = 1;
  }

  let totalPrice = 0;
  let remainingMotivation = stats.motivation;
  let itemQuantity = stats[itemType];
  while (remainingMotivation >= basePrice) {
    const price = basePrice * Math.pow(increaseRate, itemQuantity);
    if (price <= remainingMotivation) {
      totalPrice += Math.round(price);
      remainingMotivation -= price;
      itemQuantity++;
    } else {
      break;
    }
  }
  return itemQuantity - stats[itemType];
};
