import { Button, Icon } from "@rneui/base";

export default (props, navigation) => {
    return (
        <Button
            type="clear"
            icon={<Icon name="add" size={25} color={"black"} />}
            onPress={() => navigation.navigate(props)}
        />
    );
};
