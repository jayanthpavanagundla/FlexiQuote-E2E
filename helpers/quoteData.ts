export function buildQuoteData() {
    const suffix = Date.now().toString().slice(-6);
    return {
    vehicle: {
        rego: `Auto${suffix}`,
        state: 'NSW'
    },

    schedule: {
        scheduleSearch: 'F',
        scheduleOption: 'F680'
    },

    vehicleSpecs: {
        model: 'M3',
        transmission: 'A',
        color: 'Powder Blue',
        vin: '35ftghr7ccg',
        engine: 'v8',
        year: '2000',
        cyl: '6',
        cc: '1200'
    },

    paint: {
        paint1: '#eeeeee',
        paint2: '#rtevhccc'
    },

    customer: {
        firstName: 'vivek',
        lastName: 'User2343',
        selectCustomer: true
    },

    alternativeContact: {
        firstName: 'Test',
        lastName: 'User'
    },

    address: {
        address: 'Test',
        selectAddress: true
    },

    insurance: {
        primary: 'A & G Insurance Services',
        secondary: 'Insurance Australia Limited'
    }
    };
}

export const quoteData = buildQuoteData();

export const editQuoteData = {
    quoteNumber: '10008'
    // quoteNumber: '40697'
};

export const ntarData = {
    quoteNumber: '10008',
    items: [
        { search: 'turret', description: 'TURRET', type: 'U' },
        { search: 'bonnet', description: 'BONNET', type: 'U' },
        { search: 'GRILLE', description: 'GRILLE', type: 'X' },
    ],
    paintLoadingItems: ['TURRET', 'BONNET', 'GRILLE'],
};
