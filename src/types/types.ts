export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export interface IDefaultState {
    weatherMetric: object;
    weatherImperial: object;
    coordinates: {
        lat: number,
        lng: number,
    };
    address: string;
    isMetric: boolean;
    isDaily: boolean;
}