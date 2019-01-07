module.exports = (stats, startText, endText, chalkFn) => {
  console.log("\n\n\n");
  console.log(chalkFn(startText));
  console.log(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkmodules: false
    })
  );
  console.log(chalkFn(endText));
};
