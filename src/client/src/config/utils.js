const colors = {
    operations: 'magenta',
    development: 'teal',
    'hacker experience': 'blue',
    design: 'cyan',
    sponsorship: 'green',
    content: 'purple',
    marketing: 'gray'
};


export const getColorForCommittee = (committee) => {
    return colors[committee];
};