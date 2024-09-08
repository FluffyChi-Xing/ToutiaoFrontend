import Mock from 'mockjs'

export function paperMock(url: string, method: string) {
    Mock.mock(url, method, () => {

    })
}

export function testMock() {
    console.log('mock test')
    Mock.mock('http://localhost/mock/test', 'GET', () => {
        return {
            code: 200,
            data: {
                name: 'test',
                age: 18
            }
        }
    })
}
