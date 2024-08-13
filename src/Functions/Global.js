export function formatValues(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(2) + 'M';
    } else if (count >= 100000) {
        return (count / 100000).toFixed(2) + 'L';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(2) + 'K';
    } else {
        return count?.toString();
    }
}