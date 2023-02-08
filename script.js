const SquareNode = (x, y) => { 
    return {x, y, adjacents: []};
};

const createChessboard = () => {
    const chessboard = [];


    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            const node = SquareNode(x, y);
            chessboard.push(node);
        }
    }

    return chessboard; 
};

const findNode = (chessboard, x, y) => {
    return chessboard.find((node) => node.x === x && node.y === y);
};

const getAllknightMoves = () => {
    const moves = [
        {x: 1, y: 2},
        {x: 2, y: 1},
        {x: 2, y: -1},
        {x: 1, y: -2},
        {x: -1, y: -2},
        {x: -2, y: -1},
        {x: -2, y: 1},
        {x: -1, y: 2},
    ];

const chessboard = createChessboard();

for (const node of chessboard) {
for (const move of moves) {
    const newX = node. x + node.x;
    const newY = node.y + node.y;

    const newNode = findNode(chessboard, newX, newY);

    if (!newNode) continue;
    node.adjacents.push(newNode);

    }
}
return chessboard;
};

const knightMoves = (startPos, destiPos) => {
    const allknightMoves = getAllknightMoves();

    const [startX, startY] = startPos;
    const [destiX, destiY] = destiPos;
    const startNode = findNode(allknightMoves, startX, startY);
    const destiNode = findNode(allknightMoves, destiX, destiY);

    const queue = [startNode];
    let i = 0;

    let result;

    breadFirstSearch: while (i < queue.length) {
        for (const adjNode of queue[i].adjacents) {
            if (!queue.find((node) => node === adjNode)) {
                adjNode.comingFrom = queue[i];

                if (adjNode === destiNode) {
                    result = adjNode;
                    break breadFirstSearch;
                } else {
                    queue.push(adjNode);
                }
            }
        }
        i++;
    }

    result = cleanResult(result);

    printResult(result);

    return result;

};

const cleanResult = (result) => {
    const path = [];

    const getOriginNode = (result) => {
        path.unshift([result.x, result.y]);
        if (result.comingFrom) {
            getOriginNode(result.comingFrom);
        }
    };

    getOriginNode(result);

    return {path, nbOfMoves: path.length - 1};
};

const printResult = (result) => {
    const text = [`Possible in ${result.nbOfMoves} moves :`, ...result.path];

    for (const line of text) {
        console.log(line);
    }
};