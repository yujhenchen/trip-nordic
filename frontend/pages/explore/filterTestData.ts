import { FilterPanelRow } from "./FilterPanel";

const testFilterPanelRows: Array<FilterPanelRow> = [
    {
        title: "Cities",
        options: [
            { isSelected: true, value: "Option 1A" },
            { isSelected: false, value: "Option 1B" },
            { isSelected: true, value: "Option 1C" },
        ],
    },
    {
        title: "Categories",
        options: [
            { isSelected: false, value: "Option 2A" },
            { isSelected: false, value: "Option 2B" },
            { isSelected: true, value: "Option 2C" },
        ],
    },
    {
        title: "Countries",
        options: [
            { isSelected: true, value: "Option 3A" },
            { isSelected: false, value: "Option 3B" },
        ],
    },
    {
        title: "Regions",
        options: [
            { isSelected: false, value: "Option 4A" },
            { isSelected: true, value: "Option 4B" },
            { isSelected: true, value: "Option 4C" },
            { isSelected: false, value: "Option 4D" },
        ],
    },
    {
        title: "Seasons",
        options: [
            { isSelected: true, value: "Option 4A" },
            { isSelected: true, value: "Option 4B" },
            { isSelected: true, value: "Option 4C" },
            { isSelected: true, value: "Option 4D" },
        ],
    }
];

export default testFilterPanelRows;
