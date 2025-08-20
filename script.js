function set_indicator_level(indicator_el, level)
{
    const level_index = Math.round(level / 10) - 1;
    const position = (level_index * 10) + 5;
    
    indicator_el.style.left = `${position}%`;
}

let liveability_indicator = document.getElementById("liveability-indicator");
let pollution_indicator = document.getElementById("pollution-indicator");

let health_indicator = document.getElementById("health-indicator");
let water_access_indicator = document.getElementById("water-access-indicator");
let food_availability_indicator = document.getElementById("food-availability-indicator");
let electricity_supply_indicator = document.getElementById("electricity-supply-indicator");
let housing_indicator = document.getElementById("housing-indicator");
let air_pollution_indicator = document.getElementById("air-pollution-indicator");
let water_pollution_indicator = document.getElementById("water-pollution-indicator");

function random_whole_number(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random_number(min, max)
{
    return Math.random() * (max - min + 1) + min;
}

function title_case(text)
{
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function format_number(x)
{
    if (x < 10000) return x.toString();

    return x.toLocaleString();
}

function clone_object(obj)
{
    return JSON.parse(JSON.stringify(obj));
}

const MAP_DIM = 10;

const Wheat = "wheat";
const Rice = "rice";
const Wood = "wood";
const Fish = "fish";
const Seaweed = "seaweed";
const Coal = "coal";
const Iron = "iron";
const Uranium = "uranium";

const resource_price_models = {
    [Wheat]: {
        base_price: 1,
        gradient: -0.05,
        volatility: 0.06
    },
    [Rice]: {
        base_price: 2,
        gradient: 0.1,
        volatility: 0.05
    },
    [Wood]: {
        base_price: 6,
        gradient: -0.4,
        volatility: 0.04
    },
    [Fish]: {
        base_price: 3,
        gradient: 0.4,
        volatility: 0.06
    },
    [Seaweed]: {
        base_price: 2,
        gradient: 0.3,
        volatility: 0.03
    },
    [Coal]: {
        base_price: 10,
        gradient: 0.5,
        volatility: 0.07
    },
    [Iron]: {
        base_price: 7,
        gradient: 0.3,
        volatility: 0.03
    },
    [Uranium]: {
        base_price: 30,
        gradient: 1.8,
        volatility: 0.07
    }
}

function generate_prices_for_day(day)
{
    let prices = {};

    for (let resource in resource_price_models) 
    {
        let change_direction = day % random_whole_number(10, 20) == 0;

        if (change_direction)
        {
            resource_price_models[resource].gradient = -resource_price_models[resource].gradient;
        }

        let model = resource_price_models[resource];
        let price = model.base_price + (model.gradient * day);

        price *= 1 + random_number(-model.volatility, model.volatility);

        prices[resource] = Math.max(Math.round(price), 1);
    }

    return prices;
}

const Grassland = "Grassland";
const Beach = "Beach";
const Ocean = "Ocean";
const Forest = "Forest";
const River = "River";
const CoalMine = "Coal mine";
const IronMine = "Iron mine";
const UraniumMine = "Uranium mine";
const CoalPowerPlant = "Coal power plant";
const NuclearPowerPlant = "Nuclear power plant";
const DesalinationPlant = "Desalination plant";
const WheatFarm = "Wheat farm";
const IntensiveWheatFarm = "Intensive wheat farm";
const RiceFarm = "Rice farm";
const IntensiveRiceFarm = "Intensive rice farm";
const Fishery = "Fishery";
const LargeFishery = "Large fishery";
const SeaweedFarm = "Seaweed farm";
const LargeSeaweedFarm = "Large seaweed farm";
const Hospital = "Hospital";
const House = "House";
const LargeHouse = "Large house";
const Townhouse = "Townhouse";
const Apartment = "Apartment";
const BeachHouse = "Beach house";
const HydroelectricDam = "Hydroelectric dam";
const NationalPark = "National Park";
const SolarFarm = "Solar farm";
const RainwaterTank = "Rainwater tank";

const GameElement = {
    LiveabilityIndicator: "Liveability",
    PollutionIndicator: "Pollution",
    Tile: "Tile",
    BuildOption: "Build"
};

const TileAction = {
    Building: "Building",
    ForestClearing: "Forest clearing",
    Prospecting: "Prospecting"
};

const tile_action_icons = {
    [TileAction.Building]: "./icons/hammer.png",
    [TileAction.ForestClearing]: "./icons/axe.png",
    [TileAction.Prospecting]: "./icons/prospect.png"
};

const tile_types = {
    [Grassland]: {
        tile: "./tiles/grassland.svg",
        picture: null,
        description: null,
        costs: null,
        immediate_effects: null,
        ongoing_effects: null,
        pros: null,
        cons: null,
        time_to_build: null
    },
    [Beach]: {
        tile: "./tiles/beach.svg",
        picture: null,
        description: null,
        costs: null,
        immediate_effects: null,
        ongoing_effects: null,
        pros: null,
        cons: null,
        time_to_build: null
    },
    [Ocean]: {
        tile: "./tiles/ocean.svg",
        picture: null,
        description: null,
        costs: null,
        immediate_effects: null,
        ongoing_effects: null,
        pros: null,
        cons: null,
        time_to_build: null
    },
    [Forest]: {
        tile: "./tiles/forest.svg",
        picture: "./pictures/forest.jpeg",
        description: "Forests provide habitat for wildlife and filter air pollution. They are also a source of wood.",
        costs: {
            labour: 100,
            resources: {}
        },
        immediate_effects: {
            population: 0,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {},
            air_pollution: -2, /* % */
            water_pollution: 0, /* % */
            water_access: 0, /* in litres */
            health: 0, /* number of people healed per day */
            food_availability: 0, /* food items per day */
            electricity_supply: 0 /* mWh per day */
        },
        pros: [
            "Purifies polluted air.",
            "Provides habitat to wildlife.",
            "Can be cut down for wood"
        ],
        cons: [
            "A long time to grow.",
            "Takes up land that could otherwise be used for infrastructure."
        ],
        time_to_build: 20
    },
    [River]: {
        tile: "./tiles/river.svg",
        picture: null,
        description: null,
        costs: null,
        immediate_effects: null,
        ongoing_effects: null,
        pros: null,
        cons: null,
        time_to_build: null
    },
    [CoalMine]: {
        tile: "./tiles/coal-mine.svg",
        picture: "./pictures/coal-mine.jpeg",
        description: "Formed underground millions of years ago. Can be dug up and burned for heat or energy.",
        costs: {
            labour: 200,
            resources: {
                [Wood]: 150
            }
        },
        immediate_effects: {
            population: 100,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {
                [Coal]: 100
            },
            air_pollution: 0,
            water_pollution: 2,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Creates jobs, increases population.",
            "The material can be used to generate electricity or exported for a profit."
        ],
        cons: [
            "Acidifies nearby water sources and leaches toxic heavy metals into the water.",
            "Is a non-renewable resource - may run out."
        ],
        time_to_build: 5
    },
    [IronMine]: {
        tile: "./tiles/iron-mine.svg",
        picture: "./pictures/iron-mine.jpeg",
        description: "An important building material used in construction.",
        costs: {
            labour: 200,
            resources: {
                [Wood]: 100
            }
        },
        immediate_effects: {
            population: 100,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {
                [Iron]: 120
            },
            air_pollution: 0,
            water_pollution: 1,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Creates jobs, increases population.",
            "The material can be used build houses, hospitals and major infrastructure.",
            "Can also be exported for a profit"
        ],
        cons: [
            "Surface run-off from mine can contaminate water sources.",
            "Is a non-renewable resource and may run out."
        ],
        time_to_build: 4
    },
    [UraniumMine]: {
        tile: "./tiles/uranium-mine.svg",
        picture: "./pictures/uranium-mine.jpeg",
        description: "A radioactive material that is used in the fuel of nuclear reactors.",
        costs: {
            labour: 400,
            resources: {
                [Wood]: 300
            }
        },
        immediate_effects: {
            population: 100,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {
                [Uranium]: 40
            },
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Creates jobs, increases population.",
            "The material can be used to generate electricity or exported for a profit."
        ],
        cons: [
            "Is a non-renewable resource - may run out.",
            "Uranium emits potentially harmful radiation"
        ],
        time_to_build: 6
    },
    [CoalPowerPlant]: {
        tile: "./tiles/coal-power-plant.svg",
        picture: "./pictures/coal-power-station.jpeg",
        description: "Burns coal to heat water which spins a generator to produce electricity.",
        costs: {
            labour: 300,
            resources: {
                [Iron]: 300
            }
        },
        immediate_effects: {
            population: 0,
            housing: 0
        },
        ongoing_effects: {
            wealth: 400,
            resources: {
                [Coal]: -100
            },
            air_pollution: 4,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: +1600
        },
        pros: [
            "Generates lots of electricity.",
            "It's a reliable power source; functioning in most conditions.",
            "There's an abundant supply of coal around the world"
        ],
        cons: [
            "Contributes to air pollution.",
            "Uses a non-renewable fuel, coal - meaning it is used faster than it can be created.",
            "Uses significant amounts of water."
        ],
        time_to_build: 8
    },
    [NuclearPowerPlant]: {
        tile: "./tiles/nuclear-power-plant.svg",
        picture: "./pictures/nuclear-power-station.jpeg",
        description: "Splits uranium atoms to heat water and spin a generator to produce electricity.",
        costs: {
            labour: 4000,
            resources: {
                [Iron]: 1000
            }
        },
        immediate_effects: {
            population: 0,
            housing: 0
        },
        ongoing_effects: {
            wealth: 800,
            resources: {
                [Uranium]: -100
            },
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: +2400
        },
        pros: [
            "Produces large amounts of clean electricity.",
            "Low air pollution."
        ],
        cons: [
            "High cost to build and maintain.",
            "Runs on a non-renewable fuel, uranium which needs to be either mined locally or imported from another country.",
            "Uses a significant amounts of water.",
            "Risk of nuclear meltdown."
        ],
        time_to_build: 15
    },
    [DesalinationPlant]: {
        tile: "./tiles/desalination-plant.svg",
        picture: "./pictures/desalination-plant.jpeg",
        description: "Uses reverse osmosis to remove the salt from seawater turning it into fresh drinking water.",
        costs: {
            labour: 2100,
            resources: {
                [Iron]: 370
            }
        },
        immediate_effects: {
            population: 100,
            housing: 0
        },
        ongoing_effects: {
            wealth: -100,
            resources: {},
            air_pollution: 0,
            water_pollution: 3,
            water_access: 300000,
            health: 0,
            food_availability: 0,
            electricity_supply: -1000
        },
        pros: [
            "Increases water access",
            "Produces fresh drinking water even in drought."
        ],
        cons: [
            "uses a lot of energy to run.",
            "expensive to run and maintain.",
            "pollutes ocean with a salty brine that is harmful to marine life."
        ],
        time_to_build: 10
    },
    [WheatFarm]: {
        tile: "./tiles/farm.svg",
        picture: "./pictures/wheat-farm.jpeg",
        description: "A fairly drought tolerant crop used to make flour and bread.",
        costs: {
            labour: 0,
            resources: {
                [Wheat]: 50
            }
        },
        immediate_effects: {
            population: 2,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {
                [Wheat]: +100
            },
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0,
        },
        pros: [
            "Can handle dry periods.",
            "Can be used as a food."
        ],
        cons: [
            "Might not handle flooding well."
        ],
        time_to_build: 1
    },
    [IntensiveWheatFarm]: {
        tile: "./tiles/farm.svg",
        picture: "./pictures/intensive-wheat-farm.jpeg",
        description: "Uses chemical fertilisers and pesticides to improve yields at the cost of the environment.",
        costs: {
            labour: 50,
            resources: {
                [Iron]: 10
            }
        },
        immediate_effects: {
            population: 0,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {
                [Wheat]: 300
            },
            air_pollution: 0,
            water_pollution: +2,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Produces higher yields.",
            "Requires less land."
        ],
        cons: [
            "Fertiliser and pesticide runoff can pollute waterways, potentially toxifying the water.",
            "Depletes soil nutrients over time and uses excess water."
        ],
        time_to_build: 2
    },
    [RiceFarm]: {
        tile: "./tiles/farm.svg",
        picture: "./pictures/rice-farm.jpeg",
        description: "A crop that loves water. It feeds over 50% of the world's population. Handles flooding and yields well.",
        costs: {
            labour: 0,
            resources: {
                [Rice]: 70
            }
        },
        immediate_effects: {
            population: 2,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {
                [Rice]: 200
            },
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "High yielding",
            "Grows in flooded fields.",
            "Can feed many people"
        ],
        cons: [
            "Uses a lot of water to grow.",
            "Might not handle drought well."
        ],
        time_to_build: 1
    },
    [IntensiveRiceFarm]: {
        tile: "./tiles/farm.svg",
        picture: "./pictures/intensive-rice-farm.jpeg",
        description: "Uses chemical fertilisers and pesticides to improve yields at the cost of the environment.",
        costs: {
            labour: 0,
            resources: {
                [Iron]: 10
            }
        },
        immediate_effects: {
            population: 0,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {
                [Rice]: 400
            },
            air_pollution: 0,
            water_pollution: +2,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Produces higher yields.",
            "Requires less land."
        ],
        cons: [
            "Fertiliser and pesticide runoff can pollute waterways, potentially toxifying the water.",
            "Depletes soil nutrients over time and uses excess water."
        ],
        time_to_build: 2
    },
    [Fishery]: {
        tile: "./tiles/fishery.svg",
        picture: "./pictures/fishery.jpeg",
        description: "Harvest the ocean's fish.",
        costs: null,
        immediate_effects: {
            population: 3,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {
                [Fish]: 200
            },
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Provides a renewable food source.",
            "Supports local jobs."
        ],
        cons: [
            "Potential for overfishing.",
            "Sensitive to water pollution."
        ],
        time_to_build: 1
    },
    [LargeFishery]: {
        tile: "./tiles/fishery.svg",
        picture: "./pictures/fishery.jpeg",
        description: "Harvest more fish to meet demand.",
        costs: {
            labour: 100,
            resources: {}
        },
        immediate_effects: {
            population: 2,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {
                [Fish]: 400
            },
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Meets a growing demand.",
            "Expands the local economy."
        ],
        cons: [
            "Increases the risk of overfishing."
        ],
        time_to_build: 2
    },
    [SeaweedFarm]: {
        tile: "./tiles/seaweed-farm.svg",
        picture: "./pictures/seaweed-farm.jpeg",
        description: "a nutritious sushi ingredient",
        costs: {
            labour: 50,
            resources: {}
        },
        immediate_effects: {
            population: 1,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {
                [Seaweed]: 100
            },
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Fast-growing and nutritious crop.",
            "Low environmental impact.",
            "Does not require freshwater."
        ],
        cons: [
            "Needs a clean environment to thrive.",
            "It's a relatively new and unproven form of farming so not every aspect of it is understood."
        ],
        time_to_build: 1
    },
    [LargeSeaweedFarm]: {
        tile: "./tiles/seaweed-farm.svg",
        picture: "./pictures/large-seaweed-farm.jpeg",
        description: "Increase production by growing more seaweed.",
        costs: {
            labour: 100,
            resources: {}
        },
        immediate_effects: {
            population: 2,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {
                [Seaweed]: 250
            },
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Increased production",
            "Low environmental impact."
        ],
        cons: [
            "Vulnerable to ocean pollution."
        ],
        time_to_build: 2
    },
    [Hospital]: {
        tile: "./tiles/hospital.svg",
        picture: "./pictures/hospital.jpeg",
        description: "Protect your citizens' health.",
        costs: {
            labour: 1200,
            resources: {
                [Wood]: 500
            }
        },
        immediate_effects: {
            population: 50,
            housing: 0
        },
        ongoing_effects: {
            wealth: 0,
            resources: {},
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 80,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Increases your city's health"
        ],
        cons: [
            "A large commitment to build and run."
        ],
        time_to_build: 9
    },
    [House]: {
        tile: "./tiles/house.svg",
        picture: "./pictures/house.jpeg",
        description: "Houses help boost population which increases tax income",
        costs: {
            labour: 100,
            resources: {
                [Wood]: 50
            }
        },
        immediate_effects: {
            population: +3,
            housing: +3
        },
        ongoing_effects: {
            wealth: 0,
            resources: {},
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Increases population",
            "Increases tax income"
        ],
        cons: [
            "A larger population needs more infrastructure"
        ],
        time_to_build: 1
    },
    [LargeHouse]: {
        tile: "./tiles/house.svg",
        picture: "./pictures/large-house.jpeg",
        description: "Extend the home to house larger families.",
        costs: {
            labour: 120,
            resources: {
                [Wood]: 100
            }
        },
        immediate_effects: {
            population: +10,
            housing: +10
        },
        ongoing_effects: {
            wealth: 0,
            resources: {},
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Houses more families.",
            "Boosts population."
        ],
        cons: [
            "Requires more resources to build.",
            "Needs infrastructure expansion."
        ],
        time_to_build: 2
    },
    [Townhouse]: {
        tile: "./tiles/house.svg",
        picture: "./pictures/townhouse.jpeg",
        description: "Divide the house into smaller dwellings to accommodate more poeple.",
        costs: {
            labour: 120,
            resources: {
                [Wood]: 140
            }
        },
        immediate_effects: {
            population: 20,
            housing: +20
        },
        ongoing_effects: {
            wealth: 0,
            resources: {},
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Accommodates more people per land area.",
            "Makes housing more affordable."
        ],
        cons: [
            "Residents have less space to live in."
        ],
        time_to_build: 2
    },
    [Apartment]: {
        tile: "./tiles/house.svg",
        picture: "./pictures/apartment.jpeg",
        description: "Build upwards in order to fit more people in a smaller space.",
        costs: {
            labour: 200,
            resources: {
                [Wood]: 80,
                [Iron]: 30
            }
        },
        immediate_effects: {
            population: 150,
            housing: +150
        },
        ongoing_effects: {
            wealth: 0,
            resources: {},
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Maximises housing capacity.",
            "Uses land efficiently."
        ],
        cons: [
            "High construction cost.",
            "Increased infrastructure demands."
        ],
        time_to_build: 3
    },
    [BeachHouse]: {
        tile: "./tiles/beach-house.svg",
        picture: "./pictures/beach-house.jpeg",
        description: "everyone wants a beach house, however there's only so much beach to build on.",
        costs: {
            labour: 100,
            resources: {
                [Wood]: 50
            }
        },
        immediate_effects: {
            population: 6,
            housing: +6
        },
        ongoing_effects: {
            wealth: 0,
            resources: {},
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Its a popular location.",
            "Increases tax income."
        ],
        cons: [
            "A larger population needs more infrastructure",
            "The beach is subject to erosion."
        ],
        time_to_build: 1
    },
    [HydroelectricDam]: {
        tile: "./tiles/hydroelectric-dam.svg",
        picture: "./pictures/hydroelectric-dam.jpeg",
        description: "Uses the movement of water to generate electricity.",
        costs: {
            labour: 500,
            resources: {
                [Iron]: 200
            }
        },
        immediate_effects: {
            population: 0,
            housing: 0
        },
        ongoing_effects: {
            wealth: -100,
            resources: {},
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 1000
        },
        pros: [
            "Reliable and renewable energy source.",
            "Does not produce pollution."
        ],
        cons: [
            "Higher initial costs.",
            "Can only be built where there is a sufficient flow of water.",
            "Has the potential to collapse, causing significant flooding."
        ],
        time_to_build: 11
    },
    [NationalPark]: {
        tile: "./tiles/national-park.svg",
        picture: "./pictures/national-park.jpeg",
        description: "attracts tourism but prevents the forest from being logged or prospected.",
        costs: {
            labour: 50,
            resources: {}
        },
        immediate_effects: {
            population: 0,
            housing: 0
        },
        ongoing_effects: {
            wealth: 100,
            resources: {},
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Boosts tourism and revenue.",
            "Protects nature and ecosystems."
        ],
        cons: [
            "Prevents logging or resource extraction."
        ],
        time_to_build: 2
    },
    [SolarFarm]: {
        tile: "./tiles/solar-farm.svg",
        picture: "./pictures/solar-farm.jpeg",
        description: "Uses sunlight to produce electricity.",
        costs: {
            labour: 200,
            resources: {
                [Iron]: 400
            }
        },
        immediate_effects: {
            population: 0,
            housing: 0
        },
        ongoing_effects: {
            wealth: 200,
            resources: {},
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 200
        },
        pros: [
            "Produces renewable electricity.",
            "Produces less pollution than coal.",
            "Has low maintenance costs"
        ],
        cons: [
            "Power is reliant on the presence of sunlight and may not produce power in all weather conditions.",
            "The sourcing of the raw material used in the production of solar panels has an environmental impact."
        ],
        time_to_build: 5
    },
    [RainwaterTank]: {
        tile: "./tiles/rainwater-tank.svg",
        picture: "./pictures/rainwater-tank.jpeg",
        description: "Collect water when it rains.",
        costs: {
            labour: 400,
            resources: {
                [Iron]: 100
            }
        },
        immediate_effects: {
            population: 20,
            housing: 0
        },
        ongoing_effects: {
            wealth: 200,
            resources: {},
            air_pollution: 0,
            water_pollution: 0,
            water_access: 20000,
            health: 0,
            food_availability: 0,
            electricity_supply: 0
        },
        pros: [
            "Provides additional water supply.",
            "Useful during droughts."
        ],
        cons: [
            "Limited storage capacity."
        ],
        time_to_build: 1
    }
};

const builds_and_upgrades = {
    [Grassland]: [ House, WheatFarm, RiceFarm, Hospital, CoalMine, UraniumMine, IronMine, Forest, RainwaterTank, CoalPowerPlant, NuclearPowerPlant, SolarFarm ],
    [Beach]: [ BeachHouse ],
    [Ocean]: [ Fishery, SeaweedFarm, DesalinationPlant ],
    [River]: [ HydroelectricDam ],
    [Forest]: [ NationalPark ],
    [House]: [ LargeHouse ],
    [LargeHouse]: [ Townhouse ],
    [Townhouse]: [ Apartment ],
    [WheatFarm]: [ IntensiveWheatFarm ],
    [RiceFarm]: [ IntensiveRiceFarm ],
    [Fishery]: [ LargeFishery ]
};

function generate_map()
{
    let map = [];

    for (let y = 0; y < MAP_DIM; y++)
    {
        for (let x = 0; x < MAP_DIM; x++)
        {
            map[y * MAP_DIM + x] = {
                type: Grassland,
                buried_resource: null,
                population: 0
            };
        }
    }

    // out of 10
    // 1-4 = no resources on map
    // 3-9 = one resource on map
    // 10 = two resources on map
    // 4:3:1

    let no_of_resources = random_whole_number(1, 10);

    if (no_of_resources <= 4)
    {
        no_of_resources = 0;
    }
    else if (no_of_resources <= 9)
    {
        no_of_resources = 1;
    }
    else
    {
        no_of_resources = 2;
    }

    const underground_resources = [ Coal, Iron, Uranium ];
    const resource_supply = [ 2000, 5000, 1000 ];

    for (let i = 0; i < no_of_resources; i++)
    {
        const index = random_whole_number(0, MAP_DIM - 1);
        const resource_index = random_whole_number(0, underground_resources.length - 1);
        const supply = resource_supply[resource_index] + random_whole_number(-400, 400);

        map[index].buried_resource = 
        {
            type: underground_resources[resource_index],
            supply: supply,
            found: false
        };
    }

    let forest_y_off = random_whole_number(0, MAP_DIM - 4);
    let forest_x_off = random_whole_number(0, MAP_DIM - 4);

    for (let i = 0; i < 10; i++)
    {
        const width = random_whole_number(1, 2);
        const height = random_whole_number(1, 2);

        for (let y = forest_y_off, y_max = Math.min(forest_y_off + height, MAP_DIM); y < y_max; y++)
        {
            for (let x = forest_x_off, x_max = Math.min(forest_x_off + width, MAP_DIM); x < x_max; x++)
            {
                if (map[y * MAP_DIM + x].type != Grassland) continue;

                map[y * MAP_DIM + x].type = Forest;
            }
        }

        let borders = [];
        // find the coordinates of tiles on the map that border forest
        for (let y = 0; y < MAP_DIM; y++)
        {
            for (let x = 0; x < MAP_DIM; x++)
            {
                if (map[y * MAP_DIM + x].type != Forest) continue;

                for (let dy = -1; dy <= 1; dy++)
                {
                    for (let dx = -1; dx <= 1; dx++)
                    {
                        if (dy == 0 && dx == 0) continue; // skip the tile itself

                        const new_y = y + dy;
                        const new_x = x + dx;

                        if (new_y < 0 || new_y >= MAP_DIM || new_x < 0 || new_x >= MAP_DIM) continue;

                        if (map[new_y * MAP_DIM + new_x].type == Grassland)
                        {
                            borders.push({ y: new_y, x: new_x });
                        }
                    }
                }
            }
        }

        const border_index = random_whole_number(0, borders.length - 1);

        forest_y_off = borders[border_index].y;
        forest_x_off = borders[border_index].x;
    }

    const coast1_height = random_whole_number(4, 6);
    const coast2_height = MAP_DIM - coast1_height;
    const coast1_dist_to_edge = random_whole_number(2, 3);
    const coast2_dist_to_edge = random_whole_number(2, 3);

    for (let y = 0; y < coast1_height; y++)
    {
        let x = MAP_DIM - coast1_dist_to_edge;

        map[y * MAP_DIM + x++] = {
            type: Beach,
            buried_resource: null,
            population: 0
        }

        for (; x < MAP_DIM; x++)
        {
            map[y * MAP_DIM + x] = {
                type: Ocean,
                buried_resource: null,
                population: 0
            }
        }
    }

    for (let y = coast1_height; y < MAP_DIM; y++)
    {
        let x = MAP_DIM - coast2_dist_to_edge;

        map[y * MAP_DIM + x++] = {
            type: Beach,
            buried_resource: null,
            population: 0
        }

        for (; x < MAP_DIM; x++)
        {
            map[y * MAP_DIM + x] = {
                type: Ocean,
                buried_resource: null,
                population: 0
            }
        }
    }

    const has_a_river = random_whole_number(1, 10) <= 7;

    if (!has_a_river) return map;

    const min_river_length = 5;
    let river_y = random_whole_number(0, MAP_DIM - 1);

    for (let x = 0; x < MAP_DIM; x++)
    {
        if (map[river_y * MAP_DIM + x].type == Ocean) break;

        map[river_y * MAP_DIM + x] = {
            type: River,
            buried_resource: null,
            population: 0
        }

        const movement = random_whole_number(-2, 2);

        if (movement < -1)
        {
            if (river_y == 0)
            {
                if (x < min_river_length)
                {
                    river_y++;

                    continue;
                }
                else
                {
                    break;
                }
            }

            river_y--;
        }
        else if (movement > 1)
        {
            if (river_y == (MAP_DIM - 1))
            {
                if (x < min_river_length)
                {
                    river_y--;

                    continue;
                }
                else
                {
                    break;
                }
            }

            river_y++;
        }
    }

    return map;
}

let game_state = {
    city_name: "Nekoskia",
    population: 0,
    wealth: 1000,
    tax_rate: 20,
    resources: {},
    day_number: 1,
    livability_indicators:
    {
        health: 100,
        water_access: 100,
        food_availability: 100,
        electricity_supply: 100,
        housing: 100
    },
    pollution_indicators:
    {
        air_pollution: 10,
        water_pollution: 10
    },
    price_history: [ generate_prices_for_day(0), generate_prices_for_day(1) ],
    complaints: [],
    map: generate_map(),
    selected_game_element: null,
    selected_index: null,
    selected_build: null
};

game_state.current_map = clone_object(game_state.map);

function create_happiness_face(complaint)
{
    let happiness_face = document.createElement("div");
    happiness_face.className = "happiness-face";

    let face_emoji = document.createElement("img");
    face_emoji.className = "face-emoji";
    face_emoji.src = complaint ? "./icons/unhappy.png" : "./icons/happy.png";

    happiness_face.appendChild(face_emoji);

    let tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerText = complaint || "Love it here.";

    happiness_face.appendChild(tooltip);

    return happiness_face;
}

function render_build_selection_menu()
{
    let selection_heading = document.getElementById("selection-heading");
    let build_options_screen = document.getElementById("build-options-screen");
    let build_options_el = document.getElementById("build-options");
    let tile_option_buttons = document.getElementById("tile-option-buttons");
    const tile_data = game_state.current_map[game_state.selected_index];

    selection_heading.innerText = `Selection: ${tile_data.type}`;

    build_options_el.innerHTML = "";
    tile_option_buttons.innerHTML = "";

    if (tile_data.current_action)
    {
        let msg_p = document.createElement("p");

        msg_p.innerText = `${tile_data.current_action.type} in progress. Will be completed by day ${tile_data.current_action.completed_by}.`;

        build_options_el.appendChild(msg_p);

        build_options_screen.classList.remove("hidden");

        return;
    }

    const house_types = [ House, BeachHouse, LargeHouse, Townhouse, Apartment ];

    if (house_types.includes(tile_data.type) || tile_data.population != 0)
    {
        let tile_population_p = document.createElement("p");

        tile_population_p.className = "text-sm";

        if (tile_data.population == 0)
        {
            tile_population_p.innerText = "Nobody lives here.";
        }
        else if (tile_data.population == 1)
        {
            tile_population_p.innerText = "1 person lives here";
        }
        else
        {
            tile_population_p.innerText = `${tile_data.population} people live here.`;
        }

        build_options_el.appendChild(tile_population_p);
    }

    let label_p = document.createElement("p");

    label_p.className = "mb-3"

    if (tile_data.type == Grassland || game_state.map[game_state.selected_index].type == tile_data.type)
    {
        label_p.innerText = "You can build:";
    }
    else
    {
        label_p.innerText = "Upgrades:";
    }

    build_options_el.appendChild(label_p);

    const builds = builds_and_upgrades[tile_data.type] || [];

    if (builds.length == 0)
    {
        label_p.innerText = "No upgrades or builds available.";
    }

    let build_list_el = document.createElement("div");

    build_list_el.className = "flex flex-col gap-2";

    for (const build_type of builds)
    {
        const build_data = tile_types[build_type];

        if (build_type == CoalPowerPlant || build_type == NuclearPowerPlant)
        {
            let can_build = false;

            const y = Math.floor(game_state.selected_index / MAP_DIM);
            const x = (game_state.selected_index % MAP_DIM);

            for (let dy = -2; dy <= 2; dy++)
            {
                for (let dx = -2; dx <= 2; dx++)
                {
                    if (dy == 0 && dx == 0) continue;

                    const new_y = y + dy;
                    const new_x = x + dx;

                    if (new_y < 0 || new_y >= MAP_DIM || new_x < 0 || new_x >= MAP_DIM) continue;

                    const surrounding_tile = game_state.current_map[new_y * MAP_DIM + new_x];

                    if (surrounding_tile.type == River || surrounding_tile.type == Ocean)
                    {
                        can_build = true;

                        break;
                    }
                }

                if (can_build) break;
            }

            if (!can_build) continue;
        }

        else if (build_type == CoalMine)
        {
            if (!tile_data.buried_resource || !tile_data.buried_resource.found || tile_data.buried_resource.type != Coal)
            {
                continue;
            }
        }
        else if (build_type == UraniumMine)
        {
            if (!tile_data.buried_resource || !tile_data.buried_resource.found || tile_data.buried_resource.type != Uranium)
            {
                continue;
            }
        }
        else if (build_type == IronMine)
        {
            if (!tile_data.buried_resource || !tile_data.buried_resource.found || tile_data.buried_resource.type != Iron)
            {
                continue;
            }
        }

        let card = document.createElement("div");
        card.classList = "flex p-3 bg-white hover:shadow cursor-pointer gap-4 rounded";

        let left_side = document.createElement("div");
        left_side.classList = "w-2/5";

        let name = document.createElement("h3");
        name.innerText = build_type;

        left_side.appendChild(name);

        if (build_data.costs)
        {
            let label_p = document.createElement("p");

            label_p.classList = "text-sm";
            label_p.innerText = "Costs:"

            left_side.appendChild(label_p);

            for (const [resource, amount] of Object.entries(build_data.costs.resources))
            {
                let resource_p = document.createElement("p");
                resource_p.classList = "text-sm";
                resource_p.innerText = `${amount} ${resource}`;

                left_side.appendChild(resource_p);
            }

            if (build_data.costs.labour)
            {
                let labour_p = document.createElement("p");

                labour_p.classList = "text-sm";
                labour_p.innerText = `$${build_data.costs.labour} labour`;

                left_side.appendChild(labour_p);
            }
        }

        card.appendChild(left_side);

        let right_side = document.createElement("div");
        right_side.classList = "text-xs flex-1";

        let effect_lines = [];

        if (build_data.immediate_effects.population > 0)
        {
            effect_lines.push(`population: +${build_data.immediate_effects.population}`);
        }

        if (build_data.immediate_effects.housing > 0)
        {
            effect_lines.push(`housing: +${build_data.immediate_effects.housing}%`);
        }

        if (build_data.ongoing_effects)
        {
            if (build_data.ongoing_effects.wealth > 0)
            {
                effect_lines.push(`income: +$${build_data.ongoing_effects.wealth}/day`);
            }
            else if (build_data.ongoing_effects.wealth < 0)
            {
                let cost_p = document.createElement("p");
                cost_p.classList = "text-sm";
                cost_p.innerText = `$${-build_data.ongoing_effects.wealth}/day upkeep`;

                left_side.appendChild(cost_p);
            }

            if (build_data.ongoing_effects.air_pollution < 0)
            {
                effect_lines.push(`air pollution: -${-build_data.ongoing_effects.air_pollution}%/day`);
            }
            if (build_data.ongoing_effects.water_pollution < 0)
            {
                effect_lines.push(`water pollution: -${-build_data.ongoing_effects.water_pollution}%/day`);
            }
            if (build_data.ongoing_effects.food_availability > 0)
            {
                effect_lines.push(`food availability: +${build_data.ongoing_effects.food_availability}/day`);
            }
            if (build_data.ongoing_effects.electricity_supply > 0)
            {
                effect_lines.push(`electricity supply: +${format_number(build_data.ongoing_effects.electricity_supply)} MWh/day`);
            }

            if (build_data.ongoing_effects.health > 0)
            {
                effect_lines.push(`health: ${build_data.ongoing_effects.health} healed/day`);
            }

            if (build_data.ongoing_effects.water_access > 0)
            {
                effect_lines.push(`water access: +${format_number(build_data.ongoing_effects.water_access)}L/day`);
            }

            for (const [resource, amount] of Object.entries(build_data.ongoing_effects.resources))
            {
                if (amount > 0)
                {
                    effect_lines.push(`produces: ${amount} ${resource}/day`);
                }
                else if (amount < 0)
                {
                    let resource_p = document.createElement("p");
                    resource_p.classList = "text-sm";
                    resource_p.innerText = `${-amount} ${resource}/day`;

                    left_side.appendChild(resource_p);
                }
            }
        }

        for (const line of effect_lines)
        {
            let effect_p = document.createElement("p");
            effect_p.innerText = line;

            right_side.appendChild(effect_p);
        }

        let description_p = document.createElement("p");
        description_p.innerText = build_data.description;

        right_side.appendChild(description_p);

        card.appendChild(right_side);

        card.onclick = () => {
            game_state.selected_game_element = GameElement.BuildOption;
            game_state.selected_build = build_type;

            update_game_dom();
        };

        build_list_el.appendChild(card);
    }

    build_options_el.appendChild(build_list_el);

    if (tile_data.type == Forest)
    {
        let clear_button = document.createElement("button");

        clear_button.className = "button";
        clear_button.innerText = "Clear for wood";

        clear_button.onclick = () => {
            game_state.current_map[game_state.selected_index].current_action = {
                type: TileAction.ForestClearing,
                completed_by: game_state.day_number + 1
            };

            update_game_dom();
        };

        tile_option_buttons.appendChild(clear_button);
    }
    else if (tile_data.type == Grassland && !tile_data.prospected)
    {
        let button_container = document.createElement("div");
        let prospect_button = document.createElement("button");

        prospect_button.className = "button";
        prospect_button.innerText = "Prospect $20";

        button_container.className = "relative inline-block";

        button_container.appendChild(prospect_button);

        prospect_button.onclick = () => {
            if (game_state.wealth < 20)
            {
                let message = document.createElement("div");

                message.className = "tooltip";
                message.innerText = "Not enough money!";

                button_container.appendChild(message);

                setTimeout(() => {
                    message.classList.add("hidden");
                }, 3000);

                return;
            }

            game_state.wealth -= 20;

            game_state.current_map[game_state.selected_index].current_action = {
                type: TileAction.Prospecting,
                completed_by: game_state.day_number + 1
            };

            update_game_dom();
        };

        tile_option_buttons.appendChild(button_container);
    }
    else if (tile_data.type != Forest && tile_data.type != Grassland)
    {
        let demolish_button = document.createElement("button");

        demolish_button.className = "button";
        demolish_button.innerText = "Demolish";

        demolish_button.onclick = () => {
            game_state.current_map[game_state.selected_index].type = game_state.map[game_state.selected_index].type;

            update_game_dom();
        };

        tile_option_buttons.appendChild(demolish_button);
    }

    build_options_screen.classList.remove("hidden");
}

function create_ongoing_resource_warning(tile)
{
    const tile_type_data = tile_types[tile.type];
    let additonal_resources_needed = {};

    for (const [resource, amount] of Object.entries(tile_type_data.ongoing_effects.resources))
    {
        if (amount < 0 && (!game_state.resources[resource] || game_state.resources[resource] < -amount))
        {
            additonal_resources_needed[resource] = (-amount) - (game_state.resources[resource] || 0);
        }
    }

    let total_import_cost = 0;

    for (const [resource, amount] of Object.entries(additonal_resources_needed))
    {
        total_import_cost += game_state.price_history[game_state.day_number][resource] * amount;
    }

    if (total_import_cost <= 0)
    {
        tile.show_resource_warning = false;
        tile.ignore = true;

        return;
    }

    let popup = document.createElement("div");
    popup.className = "missing-ongoing-resource-popup";

    let wrapper = document.createElement("div");
    wrapper.className = "p-4 pb-3";

    let heading = document.createElement("h2");
    heading.className = "text-[21px]";
    heading.textContent = "NOT ENOUGH RESOURCES";
    wrapper.appendChild(heading);

    let missing_resource_list = document.createElement("div");
    missing_resource_list.className = "text-sm mb-4";

    let message_title = document.createElement("p");
    message_title.textContent = `${tile.type} needs:`;
    missing_resource_list.appendChild(message_title);

    for (const resource of Object.keys(additonal_resources_needed))
    {
        let p = document.createElement("p");

        p.innerText = `${-tile_type_data.ongoing_effects.resources[resource]} ${resource} (You have ${game_state.resources[resource] || 0})`;

        missing_resource_list.appendChild(p);
    }

    wrapper.appendChild(missing_resource_list);

    let button_container = document.createElement("div");
    button_container.className = "flex gap-4";

    let ignore_button = document.createElement("button");

    ignore_button.className = "bg-black text-white px-3 py-2 h-fit";
    ignore_button.textContent = "Ignore";
    ignore_button.onclick = () => {
        tile.show_resource_warning = false;
        tile.ignore = true;

        for (const tile of game_state.current_map)
        {
            if (tile.show_resource_warning)
            {
                update_game_dom();

                return;
            }
        }

        start_day();
    };

    let import_button_wrapper = document.createElement("div");
    let import_button = document.createElement("button");

    import_button_wrapper.className = "relative";

    import_button.className = "bg-white text-black px-3 py-2 h-fit";
    import_button.textContent = `Import shortfall $${Math.round(total_import_cost)}`;
    import_button.onclick = () => {
        if (total_import_cost > game_state.wealth)
        {
            let tooltip = document.createElement("div");

            tooltip.className = "tooltip";
            tooltip.innerText = "Not enough money!";

            import_button_wrapper.appendChild(tooltip);

            setTimeout(() => {
                tooltip.remove();
            }, 3000);

            return;
        }

        game_state.wealth -= total_import_cost;

        for (const resource of Object.keys(additonal_resources_needed))
        {
            game_state.resources[resource] = 0;
        }

        tile.show_resource_warning = false;
        tile.ignore = false;

        // check tiles to see if any have show_resource_warning = true
        // if so return 
        for (const tile of game_state.current_map)
        {
            if (tile.show_resource_warning)
            {
                update_game_dom();

                return;
            }
        }

        start_day();
    };

    import_button_wrapper.appendChild(import_button);

    button_container.appendChild(ignore_button);
    button_container.appendChild(import_button_wrapper);

    wrapper.appendChild(button_container);

    popup.appendChild(wrapper);

    return popup;
}

function update_game_dom()
{
    let city_name_el = document.getElementById("city-name");

    city_name_el.innerText = game_state.city_name;

    let city_name_for_instructions_el = document.getElementById("instructions-city-name");

    city_name_for_instructions_el.innerText = game_state.city_name;

    let pop_count_el = document.getElementById("population-count");

    pop_count_el.innerText = format_number(game_state.population);

    let city_wealth_el = document.getElementById("city-wealth");

    city_wealth_el.innerText = `$${format_number(game_state.wealth)}`;

    let tax_rate_el = document.getElementById("tax-rate-slider");
    let tax_rate_percent_el = document.getElementById("tax-rate-percent");

    tax_rate_el.value = game_state.tax_rate;
    tax_rate_percent_el.innerText = `${game_state.tax_rate}%`;

    let resource_list_el = document.getElementById("resource-list");

    resource_list_el.innerHTML = "";

    const resource_entries = Object.entries(game_state.resources);

    let no_of_resources = 0;

    for (const [resource, amount] of resource_entries)
    {
        if (amount == 0) continue;

        const li = document.createElement("li");
        li.innerText = `${amount} ${resource}`;

        resource_list_el.appendChild(li);

        no_of_resources++;
    }

    if (no_of_resources == 0)
    {
        const p = document.createElement("p");
        p.innerText = "(none)";

        resource_list_el.appendChild(p);
    }

    let day_number_el = document.getElementById("day-number");

    day_number_el.innerText = `Day ${game_state.day_number}`;

    const livability = Math.round((game_state.livability_indicators.health +
                        game_state.livability_indicators.water_access +
                        game_state.livability_indicators.food_availability +
                        game_state.livability_indicators.electricity_supply +
                        game_state.livability_indicators.housing) / 5);
    const pollution = Math.round((game_state.pollution_indicators.air_pollution +
                        game_state.pollution_indicators.water_pollution) / 2);
    
    set_indicator_level(liveability_indicator, livability);
    set_indicator_level(pollution_indicator, pollution);
    set_indicator_level(health_indicator, game_state.livability_indicators.health);
    set_indicator_level(water_access_indicator, game_state.livability_indicators.water_access);
    set_indicator_level(food_availability_indicator, game_state.livability_indicators.food_availability);
    set_indicator_level(electricity_supply_indicator, game_state.livability_indicators.electricity_supply);
    set_indicator_level(housing_indicator, game_state.livability_indicators.housing);
    set_indicator_level(air_pollution_indicator, game_state.pollution_indicators.air_pollution);
    set_indicator_level(water_pollution_indicator, game_state.pollution_indicators.water_pollution);

    document.getElementById("liveability-factors").classList.add("hidden");
    document.getElementById("pollution-factors").classList.add("hidden");

    let happiness_meter = document.getElementById("happiness-meter");

    happiness_meter.innerHTML = "";

    // make sure there aren't any more than 10 complaints
    game_state.complaints = game_state.complaints.slice(0, 10);

    for (let i = 0; i < (10 - game_state.complaints.length); i++)
    {
        happiness_meter.appendChild(create_happiness_face(null));
    }

    for (const complaint of game_state.complaints)
    {
        happiness_meter.appendChild(create_happiness_face(complaint));
    }

    const grid = document.getElementById("game-grid");
    grid.innerHTML = "";

    let resource_warning_shown = false;

    for (let i = 0; i < game_state.current_map.length; i++)
    {
        const tile_data = game_state.current_map[i];
        const tile_overlay = document.createElement("div");
        const tile = document.createElement("div");
        tile.className = "tile";

        tile.style.backgroundImage = `url(${tile_types[tile_data.type].tile})`;
        tile.style.backgroundSize = "cover";

        tile_overlay.className = "size-11 absolute";
        tile.appendChild(tile_overlay);

        if (tile_data.current_action)
        {
            const action_icon = document.createElement("img");
            action_icon.src = tile_action_icons[tile_data.current_action.type];
            action_icon.className = "build-icon";

            tile.appendChild(action_icon);
        }

        if (tile_data.tooltip)
        {
            const tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.innerText = tile_data.tooltip;

            tile.appendChild(tooltip);

            tile_data.tooltip = null;;
        }

        if (!resource_warning_shown && tile_data.show_resource_warning)
        {
            const ongoing_resource_warning = create_ongoing_resource_warning(tile_data);

            if (ongoing_resource_warning)
            {
                tile.appendChild(ongoing_resource_warning);

                resource_warning_shown = true;
            }
        }

        tile_overlay.onclick = () => 
        {
            if (i == game_state.selected_index)
            {
                game_state.selected_game_element = null;
                game_state.selected_index = null;
            }
            else
            {
                game_state.selected_game_element = GameElement.Tile;
                game_state.selected_index = i;
            }

            update_game_dom();
        };

        if (i == game_state.selected_index)
        {
            tile.classList.add("tile-selected");
        }
        else
        {
            tile.classList.add("title-selectable");
        }

        grid.appendChild(tile);
    }

    let selection_heading = document.getElementById("selection-heading");
    let selection_panel_instruction = document.getElementById("selection-panel-instruction");
    let build_options_screen = document.getElementById("build-options-screen");
    let build_details_el = document.getElementById("build-details");
    let back_button = document.getElementById("back-button");
    let missing_resource_popup = document.getElementById("missing-resource-popup");
    let insufficient_funds_msg = document.getElementById("insufficient-funds-msg");

    selection_panel_instruction.classList.add("hidden");
    build_options_screen.classList.add("hidden");
    build_details_el.classList.add("hidden");
    back_button.classList.add("invisible");
    missing_resource_popup.classList.add("hidden");
    insufficient_funds_msg.classList.add("hidden");

    if (game_state.selected_game_element == GameElement.LiveabilityIndicator)
    {
        selection_heading.innerText = "Liveability";

        document.getElementById("liveability-factors").classList.remove("hidden");
    }
    else if (game_state.selected_game_element == GameElement.PollutionIndicator)
    {
        selection_heading.innerText = "Pollution";

        document.getElementById("pollution-factors").classList.remove("hidden");
    }
    else if (game_state.selected_game_element == GameElement.Tile)
    {
        render_build_selection_menu();
    }
    else if (game_state.selected_game_element == GameElement.BuildOption)
    {
        const build_data = tile_types[game_state.selected_build];

        selection_heading.innerText = `Build: ${game_state.selected_build}`;

        build_details_el.classList.remove("hidden");
        back_button.classList.remove("invisible");

        let picture_el = document.getElementById("build-detail-picture");

        picture_el.src = build_data.picture;

        let description_p = document.getElementById("build-detail-description");

        description_p.innerText = build_data.description;

        let pros_list = document.getElementById("pros-list");
        let cons_list = document.getElementById("cons-list");

        pros_list.innerHTML = "";
        cons_list.innerHTML = "";

        for (const pro of build_data.pros)
        {
            let li = document.createElement("li");
            li.classList = "pl-3 relative";

            let plus_span = document.createElement("span");
            plus_span.classList = "absolute left-0";
            plus_span.innerText = "+";

            li.appendChild(plus_span);
            
            let text_span = document.createElement("span");
            text_span.innerText = pro;

            li.appendChild(text_span);

            pros_list.appendChild(li);
        }

        for (const con of build_data.cons)
        {
            let li = document.createElement("li");
            li.classList = "pl-3 relative";

            let minus_span = document.createElement("span");
            minus_span.classList = "absolute left-0";
            minus_span.innerText = "-";

            li.appendChild(minus_span);
            
            let text_span = document.createElement("span");
            text_span.innerText = con;

            li.appendChild(text_span);

            cons_list.appendChild(li);
        }

        let costs_section = document.getElementById("build-detail-costs");

        costs_section.innerHTML = "";

        if (build_data.costs)
        {
            let to_build_costs = document.createElement("div");

            let label_p = document.createElement("p");
            label_p.innerText = "To build:";

            to_build_costs.appendChild(label_p);

            for (const [resource, amount] of Object.entries(build_data.costs.resources))
            {
                let resource_p = document.createElement("p");
                resource_p.innerText = `${amount} ${resource}`;

                to_build_costs.appendChild(resource_p);
            }

            if (build_data.costs.labour)
            {
                let labour_span = document.createElement("span");
                labour_span.innerText = ` $${build_data.costs.labour} labour`;

                to_build_costs.appendChild(labour_span);
            }

            costs_section.appendChild(to_build_costs);
        }
        
        if (build_data.ongoing_effects)
        {
            let ongoing_costs = document.createElement("div");
            let label_p = document.createElement("p");
            label_p.innerText = "Ongoing:";

            ongoing_costs.appendChild(label_p);

            if (build_data.ongoing_effects.wealth < 0)
            {
                let upkeep_p = document.createElement("p");
                upkeep_p.innerText = `$${-build_data.ongoing_effects.wealth}/day upkeep`;

                ongoing_costs.appendChild(upkeep_p);
            }

            for (const [resource, amount] of Object.entries(build_data.ongoing_effects.resources))
            {
                if (amount < 0)
                {
                    let resource_p = document.createElement("p");
                    resource_p.innerText = `${-amount} ${resource}/day`;

                    ongoing_costs.appendChild(resource_p);
                }
            }

            costs_section.appendChild(ongoing_costs);
        }

        let build_button = document.getElementById("build-button");

        build_button.onclick = () => {
            //insufficient_funds_msg
            //missing_resource_popup

            if (build_data.costs)
            {
                let additonal_resources_needed = {};

                for (const [resource, amount] of Object.entries(build_data.costs.resources))
                {
                    if (!game_state.resources[resource] || game_state.resources[resource] < amount)
                    {
                        additonal_resources_needed[resource] = amount - (game_state.resources[resource] || 0);
                    }
                }

                let total_import_cost = 0;

                for (const [resource, amount] of Object.entries(additonal_resources_needed))
                {
                    total_import_cost += game_state.price_history[game_state.day_number][resource] * amount;
                }

                if ((total_import_cost + build_data.costs.labour) > game_state.wealth)
                {
                    insufficient_funds_msg.classList.remove("hidden");

                    setTimeout(() => {
                        insufficient_funds_msg.classList.add("hidden");
                    }, 3000);

                    return;
                }

                if (total_import_cost != 0)
                {
                    let missing_resource_list = document.getElementById("missing-resources-list");
                    let missing_resource_total_price_span = document.getElementById("missing-resource-total-price");

                    missing_resource_list.innerHTML = "";

                    for (const resource of Object.keys(additonal_resources_needed))
                    {
                        let p = document.createElement("p");

                        p.innerText = `${build_data.costs.resources[resource]} ${resource} (You have ${game_state.resources[resource] || 0})`;

                        missing_resource_list.appendChild(p);
                    }

                    missing_resource_total_price_span.innerText = `$${total_import_cost + build_data.costs.labour}`;

                    missing_resource_popup.classList.remove("hidden");

                    document.getElementById("missing-resource-import-no-button").onclick = () => {
                        missing_resource_popup.classList.add("hidden");
                    };

                    document.getElementById("missing-resource-import-yes-button").onclick = () => {
                        game_state.wealth -= total_import_cost;
                        game_state.wealth -= build_data.costs.labour;

                        for (const resource of Object.keys(additonal_resources_needed))
                        {
                            game_state.resources[resource] = 0;
                        }

                        game_state.current_map[game_state.selected_index].type = game_state.selected_build;
                        game_state.current_map[game_state.selected_index].current_action = {
                            type: TileAction.Building,
                            completed_by: game_state.day_number + build_data.time_to_build
                        };

                        game_state.selected_game_element = GameElement.Tile;

                        update_game_dom();
                    };

                    return;
                }
                else
                {
                    game_state.wealth -= build_data.costs.labour;

                    for (const [resource, amount] of Object.entries(build_data.costs.resources))
                    {
                        game_state.resources[resource] -= amount;
                    }
                }
            }

            game_state.current_map[game_state.selected_index].type = game_state.selected_build;
            game_state.current_map[game_state.selected_index].current_action = {
                type: TileAction.Building,
                completed_by: game_state.day_number + build_data.time_to_build
            };

            game_state.selected_game_element = GameElement.Tile;

            update_game_dom();
        };
    }
    else
    {
        selection_heading.innerText = "Selection Panel";
        selection_panel_instruction.classList.remove("hidden");
    }

    let next_day_button = document.getElementById("next-day-button");

    next_day_button.onclick = next_day;
}

function create_svg_price_graph(data)
{
    let svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");

    svg.setAttribute("viewBox", "0 0 200 100");
    svg.setAttribute("class", "w-[200px] h-[100px] bg-white");

    const w = 200;
    const h = 100;
    const pad_left = 40;
    const pad_right = 3;
    const pad_top = 10;
    const pad_bottom = 15;

    const data_y_max = Math.max(...data);
    const data_y_min = Math.min(...data);
    const data_y_range = data_y_max - data_y_min + 1;
    const data_y_count_by = Math.round(data_y_range / 3) || 1;
    const data_x_range = data.length - 1;

    const x_start = pad_left;
    const x_length = (w - x_start - pad_right);
    const x_step = x_length / data_x_range;

    const y_start = pad_bottom + 20;
    const y_length = (h - y_start - pad_top);
    const y_step = y_length / data_y_range;

    const initial = data[0];
    const final = data[data.length - 1];

    let colour = "#939393";

    if (final > initial)
    {
        colour = "#00b656";
    }
    else if (final < initial)
    {
        colour = "#DC2626";
    }

    // Scale helper
    function y_value_to_graph_y(y) {
        return h - (y_start + (y - data_y_min) * y_step);
    }

    function x_value_to_graph_x(x) {
        return x_start + x * x_step;
    }

    const points = data.map((y, x) => {
        const graph_x = x_value_to_graph_x(x);
        const graph_y = y_value_to_graph_y(y);

        return `${graph_x},${graph_y}`;
    }).join(' ');

    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', points);
    polyline.setAttribute('fill', 'none');
    polyline.setAttribute('stroke', colour);
    polyline.setAttribute('stroke-width', '3');
    svg.appendChild(polyline);

    const y_axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    y_axis.setAttribute('x1', x_start);
    y_axis.setAttribute('y1', 0);
    y_axis.setAttribute('x2', x_start);
    y_axis.setAttribute('y2', h - pad_bottom);
    y_axis.setAttribute('stroke', '#939393');
    y_axis.setAttribute('stroke-width', '2');
    svg.appendChild(y_axis);

    const x_axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    x_axis.setAttribute('x1', x_start - 1);
    x_axis.setAttribute('y1', h - pad_bottom);
    x_axis.setAttribute('x2', w - 1);
    x_axis.setAttribute('y2', h - pad_bottom);
    x_axis.setAttribute('stroke', '#939393');
    x_axis.setAttribute('stroke-width', '2');
    svg.appendChild(x_axis);

    for (let y = data_y_min; y <= data_y_max; y += data_y_count_by) {
        const graph_y = y_value_to_graph_y(y);

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x_start - 5);
        line.setAttribute('y1', graph_y);
        line.setAttribute('x2', x_start);
        line.setAttribute('y2', graph_y);
        line.setAttribute('stroke', '#939393');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('fill', '#000000');
        text.setAttribute('font-size', '12');
        text.setAttribute('text-anchor', 'end');
        text.textContent = `${y}`;
        text.style.fontFamily = "monospace";
        svg.appendChild(text);
        text.setAttribute('x', x_start - 7);
        text.setAttribute('y', graph_y + 4);
    }

    const label_wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('fill', '#000000');
    text.setAttribute('font-size', '12');
    text.setAttribute('text-anchor', 'end');
    text.setAttribute('transform', 'rotate(270, 0, 0)');
    text.textContent = "price $";
    text.style.fontFamily = "monospace";
    label_wrapper.appendChild(text);

    svg.appendChild(label_wrapper);
    label_wrapper.style.transform = `translate(14px, 22px)`;

    const label_day1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label_day1.setAttribute('fill', '#000000');
    label_day1.setAttribute('font-size', '12');
    label_day1.setAttribute('text-anchor', 'start');
    label_day1.style.fontFamily = "monospace";
    label_day1.textContent = "day 1";
    label_day1.setAttribute('x', x_start + 5);
    label_day1.setAttribute('y', (h - pad_bottom) + 12);
    svg.appendChild(label_day1);

    const label_last_day = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label_last_day.setAttribute('fill', '#000000');
    label_last_day.setAttribute('font-size', '12');
    label_last_day.setAttribute('text-anchor', 'end');
    label_last_day.style.fontFamily = "monospace";
    label_last_day.textContent = `day ${data.length - 1}`;
    label_last_day.setAttribute('x', w - pad_right - 1);
    label_last_day.setAttribute('y', (h - pad_bottom) + 12);
    svg.appendChild(label_last_day);

    return svg;
}

function get_percent_change_colour_class(price_history)
{
    const prev = price_history.at(-2);
    const curr = price_history.at(-1);
    const change = curr - prev;

    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";

    return "text-gray-500";
}

function get_percent_change_text(price_history)
{
    const prev = price_history.at(-2);
    const curr = price_history.at(-1);

    const change = curr - prev;
    const percent = Math.round((change / prev) * 100);

    if (change === 0) return "No change since yesterday";

    return `${change > 0 ? "+" : ""}${percent}% since yesterday`;
}

function create_resource_element(resource_type, price_history)
{
    const container = document.createElement("div");
    container.className = "resource flex items-start gap-4 mb-6";

    const info = document.createElement("div");
    info.className = "flex-1 self-center";

    const title = document.createElement("p");

    const resource_name_span = document.createElement("span");
    resource_name_span.className = "text-[21px]";
    resource_name_span.innerText = resource_type.charAt(0).toUpperCase() + resource_type.slice(1);

    const amount_owned_span = document.createElement("span");
    amount_owned_span.className = "text-sm text-gray-800";
    amount_owned_span.innerText = ` (You have ${game_state.resources[resource_type] || 0})`;

    title.appendChild(resource_name_span);
    title.appendChild(amount_owned_span);

    info.appendChild(title);

    const buy_price = price_history.at(-1);
    const sell_price = Math.round(price_history.at(-1) * 0.85);

    const prices = document.createElement("p");
    prices.innerText = `buy: $${buy_price}, sell: $${sell_price}`;
    info.appendChild(prices);

    const trend = document.createElement("p");
    trend.className = `resource-trend text-sm ${get_percent_change_colour_class(price_history)}`;
    trend.textContent = get_percent_change_text(price_history);
    info.appendChild(trend);

    container.appendChild(info);

    const graph_div = document.createElement("div");
    graph_div.appendChild(create_svg_price_graph(price_history));
    container.appendChild(graph_div);

    const controls = document.createElement("div");
    controls.className = "flex flex-row gap-1";

    const left_col = document.createElement("div");
    left_col.className = "flex flex-col gap-2 w-[80px]";

    const label = document.createElement("label");
    label.className = "text-[17px]";
    label.textContent = "no. of units:";

    left_col.appendChild(label);

    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.value = "1";
    input.className = "resource-input border text-sm rounded px-2 py-1";

    left_col.appendChild(input);

    function update_info()
    {
        document.getElementById("trade-total-wealth").innerText = `$${format_number(game_state.wealth)}`;

        amount_owned_span.innerText = ` (You have ${game_state.resources[resource_type] || 0})`;
    }

    const right_col = document.createElement("div");
    right_col.className = "flex flex-col items-center gap-2";

    const buy_button_wrapper = document.createElement("div");

    buy_button_wrapper.className = "relative";

    const buy_button = document.createElement("button");
    buy_button.className = "bg-black text-white px-4 py-2 w-full";
    buy_button.textContent = "Buy";

    buy_button_wrapper.appendChild(buy_button);
    right_col.appendChild(buy_button_wrapper);

    const sell_button_wrapper = document.createElement("div");

    sell_button_wrapper.className = "relative";

    const sell_button = document.createElement("button");
    sell_button.className = "bg-black text-white px-4 py-2 w-full";
    sell_button.textContent = "Sell";

    sell_button_wrapper.appendChild(sell_button);
    right_col.appendChild(sell_button_wrapper);

    controls.appendChild(left_col);
    controls.appendChild(right_col);

    container.appendChild(controls);

    buy_button.onclick = () => {
        const no_of_units = parseInt(input.value);
        const cost = buy_price * no_of_units;

        let tooltip = document.createElement("div");

        tooltip.className = "tooltip-left";

        buy_button_wrapper.appendChild(tooltip);

        setTimeout(() => {
            tooltip.remove();
        }, 2000);

        if (cost > game_state.wealth)
        {
            tooltip.innerText = "Not enough money!";

            return;
        }

        game_state.wealth -= cost;

        if (!game_state.resources[resource_type]) game_state.resources[resource_type] = 0;

        game_state.resources[resource_type] += no_of_units;

        tooltip.innerText = `Bought ${no_of_units} ${resource_type} for $${cost}.`;

        update_info();
        update_game_dom();
    };

    sell_button.onclick = () => {
        const no_of_units = parseInt(input.value);
        const value = sell_price * no_of_units;

        let tooltip = document.createElement("div");

        tooltip.className = "tooltip-left";

        sell_button_wrapper.appendChild(tooltip);

        setTimeout(() => {
            tooltip.remove();
        }, 2000);

        if (!game_state.resources[resource_type] || no_of_units > game_state.resources[resource_type])
        {
            tooltip.innerText = `You don't have ${no_of_units} ${resource_type}.`;

            return;
        }

        game_state.wealth += value;
        game_state.resources[resource_type] -= no_of_units;

        tooltip.innerText = `Sold ${no_of_units} ${resource_type} for $${value}.`;

        update_info();
        update_game_dom();
    };

    return container;
}

function open_trade_popup()
{
    let resources_container = document.getElementById("resources-container");

    resources_container.innerHTML = "";

    document.getElementById("trade-total-wealth").innerText = `$${format_number(game_state.wealth)}`;

    if (game_state.day_number > 1)
    {
        let price_history = {};

        for (const day_prices of game_state.price_history)
        {
            for (const [resource, price] of Object.entries(day_prices))
            {
                if (!price_history[resource]) price_history[resource] = [];

                price_history[resource].push(price);
            }
        }

        for (const [resource_type, history] of Object.entries(price_history))
        {
            const resource_element = create_resource_element(resource_type, history);
            resources_container.appendChild(resource_element);
        }
    }
    else
    {
        let message = document.createElement("p");

        message.innerText = "Trading not available today. Please check tomorrow.";

        resources_container.appendChild(message);
    }

    document.getElementById("trade-popup").classList.remove("hidden");
}

function close_trade_popup()
{
    document.getElementById("trade-popup").classList.add("hidden");
}

function show_instructions_window()
{
    document.getElementById("instructions-window").classList.remove("hidden");
    document.getElementById("instructions-text").scrollTop = 0;
}

function hide_instructions_window()
{
    document.getElementById("instructions-window").classList.add("hidden");
}

let play_button = document.getElementById("play-button");

play_button.addEventListener("click", () => {
    const city_name_field = document.getElementById("city-name-field");
    const city_name = city_name_field.value.trim();

    if (city_name.length == 0) return;

    game_state.city_name = title_case(city_name);

    update_game_dom();
    
    document.getElementById('title-screen').classList.add('hidden');
    document.getElementById('main-game').classList.remove('hidden');

    show_instructions_window();
});

document.getElementById("liveability-bar").addEventListener("click", () =>
{
    game_state.selected_game_element = GameElement.LiveabilityIndicator;
    game_state.selected_index = null;

    update_game_dom();
});

document.getElementById("pollution-bar").addEventListener("click", () =>
{
    game_state.selected_game_element = GameElement.PollutionIndicator;
    game_state.selected_index = null;

    update_game_dom();
});

document.getElementById("back-button").addEventListener("click", () =>
{
    game_state.selected_game_element = GameElement.Tile;

    update_game_dom();
});

const skip_title_screen = false;

if (skip_title_screen)
{
    update_game_dom();

    document.getElementById('title-screen').classList.add('hidden');
    document.getElementById('main-game').classList.remove('hidden');
}

let tax_rate_slider = document.getElementById("tax-rate-slider");

tax_rate_slider.addEventListener("input", () =>
{
    game_state.tax_rate = parseInt(tax_rate_slider.value);

    let tax_rate_percent_el = document.getElementById("tax-rate-percent");

    tax_rate_percent_el.innerText = `${game_state.tax_rate}%`;
});

function check_insufficient_resources()
{
    let does_have_missing_resource = false;
    
    for (let tile of game_state.current_map)
    {
        if (tile.current_action) continue;

        let tile_data = tile_types[tile.type];

        tile.show_resource_warning = false;
        tile.ignore = false;

        if (tile_data.ongoing_effects)
        {
            for (const [resource, amount] of Object.entries(tile_data.ongoing_effects.resources))
            {
                if (amount < 0 && (!game_state.resources[resource] || game_state.resources[resource] < -amount))
                {
                    tile.show_resource_warning = true;
                    tile.ignore = true;

                    does_have_missing_resource = true;
                }
            }
        }
    }

    return does_have_missing_resource;
}

/*
type: BuildType
current_action: {
  type: TileAction,
  completed_by: number
},
buried_resource: {
    type: ResourceType,
    supply: number,
    found: boolean
},
prospected: boolean,
population: number
*/

function start_day()
{
/*
        ongoing_effects: {
            wealth: 200,
            resources: {},
            air_pollution: 0,
            water_pollution: 0,
            water_access: 0,
            health: 0,
            food_availability: 0,
            electricity_supply: 200
        },
*/
    let total_air_pollution = game_state.pollution_indicators.air_pollution;
    let total_water_pollution = game_state.pollution_indicators.water_pollution;
    let total_water_supply = 1000;
    let total_water_demand = game_state.population * 200;
    let total_healthcare_supply = 100;
    let total_healthcare_demand = game_state.population * 0.3;
    let total_food_supply = 100;
    let total_food_demand = game_state.population * 10;
    let total_electricity_supply = 100;
    let total_electricity_demand = game_state.population * 0.05;

    for (let tile of game_state.current_map)
    {
        let tile_data = tile_types[tile.type];

        if (tile.ignore)
        {
            tile.ignore = false;

            continue;
        }

        if (tile.current_action)
        {
            if (game_state.day_number < tile.current_action.completed_by) continue;

            switch (tile.current_action.type)
            {
                case TileAction.Building:
                {
                    if (tile_data.immediate_effects)
                    {
                        tile.population += tile_data.immediate_effects.population
                        game_state.population += tile_data.immediate_effects.population;
                    }

                    break;
                }
                case TileAction.ForestClearing:
                {
                    if (!game_state.resources[Wood]) game_state.resources[Wood] = 0;
                    game_state.resources[Wood] += 50;
                    
                    tile.type = Grassland;

                    break;
                }
                case TileAction.Prospecting:
                {
                    if (tile.buried_resource)
                    {
                        tile.buried_resource.found = true;
                        tile.tooltip = `${tile.buried_resource.type} found!`;
                    }

                    tile.prospected = true;

                    break;
                }
                default:
                    break;
            }

            tile.current_action = null;
        }
        else
        {
            if (tile_data.ongoing_effects)
            {
                for (const [resource, amount] of Object.entries(tile_data.ongoing_effects.resources))
                {
                    if (!game_state.resources[resource]) game_state.resources[resource] = 0;

                    if (amount < 0 && game_state.resources[resource] < -amount)
                    {
                        // this case is dealt with already

                        continue;
                    }

                    game_state.resources[resource] += amount;
                }

                total_air_pollution += tile_data.ongoing_effects.air_pollution;
                total_water_pollution += tile_data.ongoing_effects.water_pollution;

                if (tile_data.ongoing_effects.water_access > 0)
                {
                    total_water_supply += tile_data.ongoing_effects.water_access;
                }
                else
                {
                    total_water_demand += -tile_data.ongoing_effects.water_access;
                }

                total_healthcare_supply += tile_data.ongoing_effects.health;

                if (tile_data.ongoing_effects.food_availability > 0)
                {
                    total_food_supply += tile_data.ongoing_effects.food_availability;
                }
                else
                {
                    total_food_demand += -tile_data.ongoing_effects.food_availability;
                }

                if (tile_data.ongoing_effects.electricity_supply > 0)
                {
                    total_electricity_supply += tile_data.ongoing_effects.electricity_supply;
                }
                else
                {
                    total_electricity_demand += -tile_data.ongoing_effects.electricity_supply;
                }

                game_state.wealth += tile_data.ongoing_effects.wealth;
            }
        }
    }

    for (const [ resource, amount ] of Object.entries(game_state.resources))
    {
        if ([ Wheat, Rice, Fish, Seaweed ].includes(resource))
        {
            total_food_supply += amount;
        }
    }

    let limit_value = (indicator_level) => Math.min(Math.max(Math.round(indicator_level), 10), 100);

    game_state.pollution_indicators.air_pollution = limit_value(total_air_pollution);
    game_state.pollution_indicators.water_pollution = limit_value(total_water_pollution);
    game_state.livability_indicators.water_access = limit_value(total_water_supply / total_water_demand * 100);
    game_state.livability_indicators.health = limit_value(total_healthcare_supply / total_healthcare_demand * 100);
    game_state.livability_indicators.food_availability = limit_value(total_food_supply / total_food_demand * 100);
    game_state.livability_indicators.electricity_supply = limit_value(total_electricity_supply / total_electricity_demand * 100);

    let taxable_income_per_person = 100;

    if (game_state.population < 1000)
    {
        taxable_income_per_person = 50;
    }
    else if (game_state.population < 5000)
    {
        taxable_income_per_person = 100;
    }
    else if (game_state.population < 10000)
    {
        taxable_income_per_person = 200;
    }
    else if (game_state.population < 50000)
    {
        taxable_income_per_person = 300;
    }
    else
    {
        taxable_income_per_person = 400;
    }

    let total_tax_income = Math.round(taxable_income_per_person * (game_state.tax_rate/100) * game_state.population);

    game_state.wealth += total_tax_income;

    let food_availability_min = 80;
    let water_access_min = 80;
    let water_pollution_max = 40;
    let air_pollution_max = 50;
    let health_min = 70;
    let electricity_supply_min = 80;
    let housing_min = 70;
    let tax_rate_max = 10;

    if (game_state.population < 1000)
    {
        tax_rate_max = 10;
    }
    else if (game_state.population < 5000)
    {
        tax_rate_max = 15;
    }
    else if (game_state.population < 10000)
    {
        tax_rate_max = 20;
    }
    else if (game_state.population < 50000)
    {
        tax_rate_max = 25;
    }
    else
    {
        tax_rate_max = 30;
    }

    let unhappy_messages = {}; // /6

    if (game_state.tax_rate > tax_rate_max)
    {
        unhappy_messages["Taxes are too high!"] = game_state.tax_rate - tax_rate_max;
    }

    if (game_state.livability_indicators.food_availability < food_availability_min)
    {
        unhappy_messages["I'm hungry."] = food_availability_min - game_state.livability_indicators.food_availability;
    }

    if (game_state.livability_indicators.water_access < water_access_min)
    {
        unhappy_messages["There's no water coming from the tap."] = water_access_min - game_state.livability_indicators.water_access;
    }

    if (game_state.pollution_indicators.water_pollution > water_pollution_max)
    {
        unhappy_messages["The water here is making me sick."] = game_state.pollution_indicators.water_pollution - water_pollution_max;
    }

    if (game_state.pollution_indicators.air_pollution > air_pollution_max)
    {
        unhappy_messages["The air is so dirty here."] = game_state.pollution_indicators.air_pollution - air_pollution_max;
    }

    if (game_state.livability_indicators.health < health_min)
    {
        unhappy_messages["There's no doctors in town."] = health_min - game_state.livability_indicators.health;
    }

    if (game_state.livability_indicators.electricity_supply < electricity_supply_min)
    {
        unhappy_messages["The power's always going out."] = electricity_supply_min - game_state.livability_indicators.electricity_supply;
    }

    if (game_state.livability_indicators.housing < housing_min)
    {
        unhappy_messages["There's nowhere to live!"] = housing_min - game_state.livability_indicators.housing;
    }

    messages_sorted = Object.keys(unhappy_messages).sort((a, b) => unhappy_messages[b] - unhappy_messages[a]);

    console.log(unhappy_messages);

    const sensitivity = 7;

    for (let [ message, frequency ] of Object.entries(unhappy_messages))
    {
        unhappy_messages[message] = Math.min(Math.max(Math.round(frequency / sensitivity), 1), 10);
    }

    console.log(unhappy_messages);

    game_state.complaints = [];

    let remaining_complaints = 10;

    for (const message of messages_sorted)
    {
        let frequency = Math.min(unhappy_messages[message], remaining_complaints);

        for (let i = 0; i < frequency; i++)
        {
            game_state.complaints.push(message);
        }

        remaining_complaints -= frequency;
    }

    game_state.population = 0;

    for (let tile of game_state.current_map)
    {
        if (remaining_complaints < 4)
        {
            tile.population = Math.floor(tile.population * 0.9);
        }

        game_state.population += tile.population;
    }

    update_game_dom();
}

function next_day()
{
    for (const tile of game_state.current_map)
    {
        if (tile.show_resource_warning)
        {
            return;
        }
    }

    game_state.day_number++;

    game_state.price_history.push(generate_prices_for_day(game_state.day_number));

    if (check_insufficient_resources())
    {
        update_game_dom();

        return;
    }

    start_day();
}

