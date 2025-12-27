import React from 'react';
import { Row } from 'reactstrap';
import Tile from './Tile';

function Hand(props) {
    const tiles = [];
    let index = 0;

    let hand = props.tiles;

    if (!hand) {
        return <Row />;
    }

    let lastDraw = props.lastDraw;
    let hasLastDraw = lastDraw > -1;

    if (hasLastDraw) {
        hand[lastDraw]--;
    }

    let None = "None";
    let best =  "5px solid black"
    let border = None;

    for (let i = 0; i < hand.length; i++) {
        // aka red 5
        if (i % 10 === 5 && hand[i - 5] > 0) {
            for (let j = 0; j < hand[i - 5]; j++) {
                tiles.push((
                    <Tile className="handTile"
                        key={index++}
                        tile={i - 5}
                        displayTile={hasLastDraw && props.blind ? 30 : i - 5}
                        onClick={props.onTileClick}
                        showIndexes={props.showIndexes}
                    />
                ));
            }
        }
        // the rest of the hand without the new tile

        if (hand[i] === 0) continue;
        if (i % 10 === 0) continue;
        for (let j = 0; j < hand[i]; j++) {
            border = None;
            console.log(props.bestTile + " " + i);
            if (props.bestTile === i){
                border=best;
            }

            tiles.push((
                <Tile className="handTile"
                    key={index++}
                    tile={i}
                    style={{border:border}}
                    displayTile={hasLastDraw && props.blind ? 30 : i}
                    onClick={props.onTileClick}
                    showIndexes={props.showIndexes}
                />
            ));
        }

    }

    // new tile
    if (hasLastDraw) {
        hand[lastDraw]++;
        tiles.push((
            <Tile className="handTile"
                key={index++}
                tile={lastDraw}
                displayTile={lastDraw}
                onClick={props.onTileClick}
                showIndexes={props.showIndexes}
            />
        ));
    }

    return (
        <Row>
            {tiles}
        </Row>
    );
}

export default Hand;
