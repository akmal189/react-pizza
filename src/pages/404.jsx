export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen flex-col gap-5">
            <div className="text-center">
                <span className="text-6xl font-bold mb-4">😕</span>
            </div>
            <h1 className="text-4xl font-bold">Ничего не найдено</h1>
            <p className="text-xl">К сожалению, данная страница отсутствует в нашем интернет-магазине</p>
        </div>
    );
}