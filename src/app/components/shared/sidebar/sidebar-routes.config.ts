export const ROUTES = [
    { path: '/home/dashboard', id: 'dashboard', title: 'Dashboard', icon: 'fa fa-tachometer', children: null },
    { path: '/home/patients', id: 'patients', title: 'Pacientes', icon: 'fa fa-user', children: null },
    {
        id: 'register', title: 'Cadastro', icon: 'fa fa-pencil-square-o', subMenuOpen: false, children: [
            { path: '/home/health-insurances', id: 'health-insurances', title: 'Planos de Saúde', icon: 'fa fa-medkit' },
            { path: '/home/anamnesis', id: 'anamnesis', title: 'Anamnese', icon: 'fa fa-file-text' },

        ]
    },
];
