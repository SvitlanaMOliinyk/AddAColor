

export function colorResult(userSeason: string) {
  let season: string[] = []
  if (userSeason === "Light Spring") {
    season = ["#F8CFA9", "#D9EA9A", "#C5B4E3", "#D9B490"]
  }

  if (userSeason === "Bright Spring") {
    season = ["#FFCD00", "#DA291B", "#00A499", "#BE5400"];
  }
  if (userSeason === "True Spring") {
    season = ["#74AA50", "#2CCCD3", "#DA291B", "#963CBD"];
  }
  if (userSeason === "Light Summer") {
    season = ["#99D6EA", "#ECB3CB", "#6DCDB8", "#C964CF"];
  }
  if (userSeason === "Soft Summer") {
    season = ["#F1BDC8", "#9CAF88", "#808286", "#77A0B5"];
  }
  if (userSeason === "True Summer") {
    season = ["#E277CD", "#0077C8", "#57728B", "#93328E"];
  }
  if (userSeason === "Soft Autumn") {
    season = ["#FCD299", "#899064", "#946037", "#487A7B"];
  }
  if (userSeason === "Dark Autumn") {
    season = ["#DAAA01", "#9A3324", "#5D6439", "#890B58"];
  }
  if (userSeason === "True Autumn") {
    season = ["#FFCD00", "#A6631B", "#9A3324", "#046A38"];
  }
  if (userSeason === "Bright Winter") {
    season = ["#C8D8EB", "#01A3E1", "#E00985", "#009775"];
  }
  if (userSeason === "Dark Winter") {
    season = ["#004B87", "#890B58", "#131413", "#5C058C"];
  }
  if (userSeason === "True Winter") {
    season = ["#59CBE8", "#009775", "#84329B", "#CE0037"];
  }

   const userColors: React.CSSProperties = {
    borderStyle: "solid",
    borderWidth: "40px",
    borderColor: season.length > 0 ? season.join(" ") : undefined
    // `linear-gradient(to right, ${season.join(" ")})`
}
  return userColors
}
