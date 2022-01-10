export const TYPES = {
    types: [
        'All',
        'Sneakers',
        'Sports shoes',
        'Winter boots',
        'Moccasins',
        'Business shoes',
        'Slippers',
        'High-heeled shoes',
        'Boots',
        'Pumps'
    ]
};

export const GENDERS = {
    genders: [
        'Men',
        'Woman',
        'Kids'
    ]
};

export const COLORS = {
    colors: [
        { title: 'Black', color: 'bg-black' },
        {title: 'White', color: 'bg-white'},
        {title: 'Beige', color: 'bg-orange-200'},
        {title: 'Brown', color: 'bg-yellow-900'},
        {title: 'Red', color: 'bg-red-600'},
        {title: 'Orange', color: 'bg-orange-600'},
        {title: 'Gray', color: 'bg-zinc-500'},
        {title: 'Yellow', color: 'bg-yellow-400'},
        {title: 'Green', color: 'bg-green-600'},
        {title: 'Blue', color: 'bg-sky-600'},
        {title: 'Purple', color: 'bg-violet-600'},
        {title: 'Pink', color: 'bg-pink-500'}
    ]
};

export const SIZES = {
    sizes: [
        26,28,29,31,32,33,34,34.5,35,35.5,36,36.5,37,37.5,38,38.5,39,39.5,40,40.5,41,41.5,42,42.5,43,43.5,44,44.5,45,45.5,46,46.5,47,47.5,48,48.5,49,49.5,50,50.5,51,51.5,52,52.5,53,53.5,54,54.5,55
    ]
};

export const MATERIALS = {
    materials: [
        'Leather',
        'Artificial leather',
        'Leather and fabric',
        'Cotton',
        'Leather-like / fabric',
        'Suede',
        'Synthetic',
        'Rubber'
    ]
};

export const LEGENDS = {
    legends: [
        {title: 'Out of stock', color: 'bg-gray'},
        {title: 'In stock', color: 'bg-blue'},
        {title: 'On sale', color: 'bg-red-600'},
        {title: 'New', color: 'bg-neutral-green'},
        {title: 'Last pairs', color: 'bg-yellow-400'},
    ],
    legendsTitles: {
        OUT_OF_STOCK: 'Out of stock',
        IN_STOCK: 'In stock',
        ON_SALE: 'On sale',
        NEW: 'New',
        LAST_PAIRS: 'Last pairs',
    }
};




export const ERRORS = {
    MODEL_IS_REQUIRED: 'Enter a model',
    SIZE_IS_REQUIRED: 'Choose size',
    TYPE_IS_REQUIRED: 'Choose type',
    BRAND_IS_REQUIRED: 'Choose brand',
    MATERIAL_IS_REQUIRED: 'Choose material',
    GENDER_IS_REQUIRED: 'Choose gender',
    COLORS_IS_REQUIRED: 'Choose at least one color',
    PHOTOS_IS_REQUIRED: 'Choose at least one photo',
    AMOUNT_IS_REQUIRED: 'Enter an amount',
    AMOUNT_IS_NOT_A_NUMBER: 'Invalid amount form',
    PRICE_IS_REQUIRED: 'Enter price',
    PRICE_IS_NOT_A_NUMBER: 'Invalid price form',
    DISCOUNT_IS_REQUIRED: 'Enter discount',
    DISCOUNT_IS_NOT_A_NUMBER: 'Invalid discount form',
};

export const ORDER_STATUSES = {
    IN_PROGRESS: 'in progress',
    CANCELED: 'canceled',
    SHIPPED: 'shipped'
};