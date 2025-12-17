
const part1 = "part1.txt";
const part2 = "part2.txt";
const part3 = "part3.txt";
const targetFormat = "PDF";
const quality_lvl = "High";

part1$ = convertDoc(part1, targetFormat, quality_lvl)

part1$
    .then((part1) => {
        return part1;
    })
    .catch((err) => console.log(err));

part2$ = convertDoc(part2, targetFormat, quality_lvl)

part2$
    .then((part2) => {
        return part2;
    })
    .catch((err) => console.log(err));

part3$ = convertDoc(part3, targetFormat, quality_lvl)

part3$
    .then((part3) => {
        return part3;
    })
    .catch((err) => console.log(err));

Promise.all([part1$, part2$, part3$])
    .then(([part1, part2, part3]) => {
        return mergeDocuments([part1, part2, part3]);
    })
    .then((mergedDocument) => {
        process_document(mergedDocument);
    })
    .catch((err) => console.log(err));