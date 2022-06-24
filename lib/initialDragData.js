export const initialData = {
    preferences:{
        'crime': {
            id: 'crime',
            content: 'Crime Safety'
        },
        'nightlife': {
            id: 'nightlife',
            content: 'Nightlife'
        },
        'col': {
            id: 'col',
            content: 'General Cost of Living Affordability'
        },
        'jobs': {
            id: 'jobs',
            content: 'Job Market'
        },
        'family': {
            id: 'family',
            content: 'Family Friendliness'
        },
        'schools': {
            id: 'schools',
            content: 'Public School Rankings'
        },
        'outdoors': {
            id: 'outdoors',
            content: 'Outdoor Activity Abundance'
        },
        'health': {
            id: 'health',
            content: 'Hospitals & Healthcare Quality'
        },
        'diversity': {
            id: 'diversity',
            content: 'Diversity'
        },
        'commute': {
            id: 'commute',
            content: 'Short Commute'
        },
    },
    columns:{
        'preferences':{
            id: 'preferences',
            title: 'Rank Your Most Important Factors',
            preferenceIds: ['crime', 'nightlife', 'col', 'jobs', 'family', 'schools', 'outdoors', 'health', 'diversity', 'commute']
        }
    },
    columnOrder: ['preferences']
}