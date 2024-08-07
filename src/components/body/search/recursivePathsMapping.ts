function recursivePathsMapping({data, currentPath = "", ignoreData = false}: {
    data: any,
    currentPath?: string,
    ignoreData?: boolean
}): string[] {
    // returns an array of all the paths in the data
    const dataPaths = [] as any[];
    Object.keys(data).forEach((key) => {
      dataPaths.push({
        // isDirect is true when the object directly leads to data and not just more options
        isDirect: Array.isArray(data[key]),
        path: `${currentPath}${currentPath ? "/" : ""}${key}`,
        data: ignoreData ? "" : (Array.isArray(data[key])
          ? data[key]
          : "Data only in Direct Objects :-)"),
      });
      if (!Array.isArray(data[key])) {
        dataPaths.push(
          ...recursivePathsMapping({
            data: data[key],
            currentPath: `${currentPath}${currentPath ? "/" : ""}${key}`,
            ignoreData
        }
          )
        );
      }
    });
    return dataPaths;
  }

  export default recursivePathsMapping