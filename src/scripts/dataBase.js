let contacts = [];


let groups = [];
let initialsColors = ['#3F51B5', '#9C27B0', '#2196F3', '#E91E63', '#00BCD4', '#FF5722', '#009688', '#795548', '#FFC107', '#607D8B', '#8BC34A', '#FFEB3B', '#4CAF50', '#FF9800', '#F44336', '#CDDC39', '#9E9E9E', '#FFEB3B', '#795548', '#3F51B5', '#9C27B0', '#00BCD4', '#2196F3', '#FFC107', '#E91E63'];


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
        // {
        //     'title': '',
        //     'description': '',
        //     'category': '',
        //     'assignedTo': '',
        //     'date': '',
        //     'prio': '',
        //     'subtask': '',
        // },
        {
            'title': 'Website-Redesign',
            'description': 'Unsere Website benötigt ein neues Design, das moderner und benutzerfreundlicher ist.',
            'category': 'Web-Entwicklung',
            'assignedTo': ['John Doe', 'Hans Hammer', 'Peter Wurst'],
            'date': '15. Juni 2023',
            'prio': 'low',
            'subtask': [
                {
                    'id': 1,
                    'title': 'Test',
                    'status': false
                },
                {
                    'id': 2,
                    'title': 'Test',
                    'status': false
                },
                {
                    'id': 3,
                    'title': 'Test',
                    'status': false
                }
            ]
        },
        {
            'title': 'Kunden-Feedback sammeln',
            'description': 'Wir müssen Feedback von Kunden sammeln, um zu verstehen, was wir verbessern können.',
            'category': 'Marketing',
            'assignedTo': ['John Doe', 'Hans Hammer', 'Peter Wurst'],
            'date': '30. Mai 2023',
            'prio': 'medium',
            'subtask': [
                {
                    'id': 1,
                    'title': 'Test',
                    'status': true
                },
                {
                    'id': 2,
                    'title': 'Test',
                    'status': true
                },
                {
                    'id': 3,
                    'title': 'Test',
                    'status': true
                }
            ]
        }
    ],
    inProgress: [
        {
            'title': 'Website-Redesign',
            'description': 'Unsere Website benötigt ein neues Design, das moderner und benutzerfreundlicher ist.',
            'category': 'Web-Entwicklung',
            'assignedTo': ['John Doe', 'Hans Hammer', 'Peter Wurst'],
            'date': '15. Juni 2023',
            'prio': 'urgent',
            'subtask': [
                {
                    'id': 1,
                    'title': 'Test',
                    'status': true
                },
                {
                    'id': 2,
                    'title': 'Test',
                    'status': true
                },
                {
                    'id': 3,
                    'title': 'Test',
                    'status': true
                }
            ]
        },
        {
            'title': 'Kunden-Feedback sammeln',
            'description': 'Wir müssen Feedback von Kunden sammeln, um zu verstehen, was wir verbessern können.',
            'category': 'Marketing',
            'assignedTo': [],
            'date': '30. Mai 2023',
            'prio': 'Mittel',
            'subtask': [
                {
                    'id': 1,
                    'title': 'Test',
                    'status': true
                },
                {
                    'id': 2,
                    'title': 'Test',
                    'status': true
                },
                {
                    'id': 3,
                    'title': 'Test',
                    'status': true
                }
            ]
        }
    ],
    feedback: [
        {
            'title': 'Website-Redesign',
            'description': 'Unsere Website benötigt ein neues Design, das moderner und benutzerfreundlicher ist.',
            'category': 'Web-Entwicklung',
            'assignedTo': [],
            'date': '15. Juni 2023',
            'prio': 'Hoch',
            'subtask': '1. Wireframing 2. Design-Entwicklung 3. Implementierung'
        },
        {
            'title': 'Kunden-Feedback sammeln',
            'description': 'Wir müssen Feedback von Kunden sammeln, um zu verstehen, was wir verbessern können.',
            'category': 'Marketing',
            'assignedTo': [],
            'date': '30. Mai 2023',
            'prio': 'Mittel',
            'subtask': '1. Erstellen einer Umfrage 2. Versenden der Umfrage an Kunden 3. Analyse der Ergebnisse'
        }
    ],
    done: [
        {
            'title': 'Website-Redesign',
            'description': 'Unsere Website benötigt ein neues Design, das moderner und benutzerfreundlicher ist.',
            'category': 'Web-Entwicklung',
            'assignedTo': [],
            'date': '15. Juni 2023',
            'prio': 'Hoch',
            'subtask': '1. Wireframing 2. Design-Entwicklung 3. Implementierung'
        },
        {
            'title': 'Kunden-Feedback sammeln',
            'description': 'Wir müssen Feedback von Kunden sammeln, um zu verstehen, was wir verbessern können.',
            'category': 'Marketing',
            'assignedTo': [],
            'date': '30. Mai 2023',
            'prio': 'Mittel',
            'subtask': '1. Erstellen einer Umfrage 2. Versenden der Umfrage an Kunden 3. Analyse der Ergebnisse'
        }
    ]
};

let login = [
    {
        'name': '',
        'email': '',
        'password': ''
    }
];