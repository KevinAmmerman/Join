    let contacts = [];
// let contacts = [
//     {
//         'name': 'Hans Bauer',
//         'email': 'hans.mueller@web.de',
//         'phone': '+49 89 7865975'
//     },
//     {
//         'name': 'Thomas Bauer',
//         'email': 'thomas.mueller@web.de',
//         'phone': '+49 89 7865975'
//     },
//     {
//         'name': 'Ben Himmel',
//         'email': 'ben.mueller@web.de',
//         'phone': '+49 89 7865975'
//     },
//     {
//         'name': 'Bruce Windo',
//         'email': 'ben.mueller@web.de',
//         'phone': '+49 89 7865975'
//     },
//     {
//         'name': 'Bennded Gammel',
//         'email': 'ben.mueller@web.de',
//         'phone': '+49 89 7865975'
//     },
//     {
//         'name': 'Anton Hund',
//         'email': 'anton.mueller@web.de',
//         'phone': '+49 89 7865975'
//     },
//     {
//         'name': 'Bennded Himmel',
//         'email': 'ben.mueller@web.de',
//         'phone': '+49 89 7865975'
//     },
//     {
//         'name': 'Anton Petes',
//         'email': 'anton.mueller@web.de',
//         'phone': '+49 89 7865975'
//     },
//     {
//         'name': 'Bennded Wurst',
//         'email': 'ben.mueller@web.de',
//         'phone': '+49 89 7865975'
//     },
//     {
//         'name': 'Anton Mller',
//         'email': 'anton.mueller@web.de',
//         'phone': '+49 89 7865975'
//     }
// ];

let groups = [];
let initialsColors = [  '#3F51B5',  '#9C27B0',  '#2196F3',  '#E91E63',  '#00BCD4',  '#FF5722',  '#009688',  '#795548',  '#FFC107',  '#607D8B',  '#8BC34A',  '#FFEB3B',  '#4CAF50',  '#FF9800',  '#F44336',  '#CDDC39',  '#9E9E9E',  '#FFEB3B',  '#795548',  '#3F51B5',  '#9C27B0',  '#00BCD4',  '#2196F3',  '#FFC107',  '#E91E63'];


// all the categories

// 'color' refers to CSS classes

let categories = [
	{
		name: 'Sales',
		color: 'lightpink',
	},

	{
		name: 'Marketing',
		color: 'blue',
	},

	{
		name: 'Design',
		color: 'turquoise',
	},

	{
		name: 'Developement',
		color: 'red',
	},
];






let tasks = {
    toDo: [
        {
            'title': '',
            'description': '',
            'category': '',
            'assignedTo': '',
            'date': '',
            'prio': '',
            'subtask': '',
        }
    ],
    inProgress: [],
    feedBack: [],
    done: []
};

let login = [
    {
        'name': '',
        'email': '',
        'password': ''
    }
];