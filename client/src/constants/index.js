const BOOK_FORM_FIELDS = [
    { name: 'title', typeof: 'string', defaultValue: '' },
    { name: 'description', typeof: 'text', defaultValue: '' },
    { name: 'year', typeof: 'number', defaultValue: '' },
    { name: 'image', typeof: 'string', defaultValue: '', title: 'Image URL' },
    { name: 'author', typeof: 'select', defaultValue: '', options: [] },
    { name: 'genre', typeof: 'select', defaultValue: '', options: [] },
]