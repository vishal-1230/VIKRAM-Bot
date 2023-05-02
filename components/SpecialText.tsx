const SpecialText = ({children, extra=""}: {children: string, extra?: string}) => {
    return <span className={`bg-gradient-to-r gradie from-gradient-pink to-gradient-blue bg-clip-text fill text-transparent ${extra}`}>{children}</span>;
}

export default SpecialText;