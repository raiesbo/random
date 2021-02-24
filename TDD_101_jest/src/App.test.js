import { hello, add, removeSNames } from './App';

describe('hello', () => {
    it("should output hello", () => {
        expect(hello()).toBe("Hello");
    })
})

describe('add', () => {
    it("adds two numbers", () => {
        expect(add(1, 2)).toBe(3);
        expect(add(3, 2)).toBe(5);
        expect(add(-2, 2)).toBe(0);
        expect(add(-2, -2)).toBe(-4);
    });
    it('shoupd not add stirngs', () => {
        expect(add(2, '2')).toBe(null)
    });
    it('shoupd not add object', () => {
        expect(add(2, {})).toBe(null)
    });
    it('shoupd not add arrays', () => {
        expect(add(2, [])).toBe(null)
    });
})

// TDD

describe("removeSName", () => {
    it('should remove all s names', () => {
        const names = ['Scott', 'Courtney', 'Steve']
        expect(removeSNames(names)).not.toContain('Scott')
        expect(removeSNames(names)).not.toContain('Steve')
    });
    it('should not remove other names', () => {
        const names = ['Scott', 'Courtney', 'Wes']
        expect(removeSNames(names)).toContain('Courtney')
        expect(removeSNames(names)).toContain('Wes')
    });
    it('should account for case', () => {
        const names = ['Scott', 'Courtney', 'Wes', 'scott']
        expect(removeSNames(names)).not.toContain('Scott')
        expect(removeSNames(names)).not.toContain('scott')
    });
});