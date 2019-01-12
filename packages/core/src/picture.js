import { dirFromMove } from './game';

export const TRANSLATE_DURATION = 100;

export const TILE_MARGIN = 2;
export const MAX_TILE_SIZE = 100;

export const DEFAULT_IMAGE_SIZE = 400; // 400px
export const IMAGE_SIZE = 100; // 100%

export const divideBackgroundStyle = (imageSize, nbOfTiles) =>
    imageSize / (nbOfTiles + 1);

export const buildBackgroundStyle = (
    nbTiles,
    tileImageUrl,
    tileImageCoords,
    tileSize,
    unit = 'px',
) => ({
    backgroundImage: `url(${tileImageUrl})`,
    backgroundPosition: tileImageCoords,
    backgroundSize: `${(nbTiles + 1) * tileSize}${unit}`,
});

export const buildDimensionStyle = (tileSize = MAX_TILE_SIZE, unit = 'px') => ({
    height: `calc(${tileSize}${unit})`,
    margin: `${TILE_MARGIN}px`,
    width: `calc(${tileSize}${unit})`,
});

export const buildTranslateStyle = (dir, tileSize, unit = 'px') => {
    const translatingDir = {
        y: `${dir.y} * (${tileSize}${unit} + ${TILE_MARGIN}px)`,
        x: `${dir.x} * (${tileSize}${unit} + ${TILE_MARGIN}px)`,
    };
    return {
        transition: `transform ${TRANSLATE_DURATION}ms ease-out`,
        transform: `translate(calc(${translatingDir.x}), calc(${
            translatingDir.y
        }))`,
    };
};

export const getUnits = isResponsive => (isResponsive ? 'vw' : 'px');

export const buildResponsiveDimension = (isResponsive, nbTiles) => {
    const tileSize = divideBackgroundStyle(
        isResponsive ? IMAGE_SIZE : DEFAULT_IMAGE_SIZE,
        nbTiles,
    );

    const dimensionStyle = buildDimensionStyle(
        tileSize,
        getUnits(isResponsive),
    );

    return { dimensionStyle, tileSize };
};

export const buildResponsiveBackground = (
    isResponsive,
    nbTiles,
    tileImageUrl,
    tileImageCoords,
    tileSize,
) =>
    buildBackgroundStyle(
        nbTiles,
        tileImageUrl,
        tileImageCoords,
        tileSize,
        getUnits(isResponsive),
    );

export const buildResponsiveTranslate = (
    isResponsive,
    grid,
    tileSize,
    tileValue,
) => {
    const dir = dirFromMove(grid, tileValue);
    return buildTranslateStyle(
        dir,
        tileSize,
        tileValue,
        getUnits(isResponsive),
    );
};
