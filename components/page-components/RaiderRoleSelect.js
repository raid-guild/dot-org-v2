import { Select } from "@chakra-ui/react";

export default function RaiderRoleSelect(props) {
  const { editRaiderRole, value, index } = props;
  return (
    <Select
      sx={{ borderColor: `red` }}
      onChange={(event) => editRaiderRole(event.target.value, index)}
    >
      <option
        style={{
          backgroundColor: `rgba(10, 10, 10, 0.960784)`,
          color: `#ff3864`,
        }}
        value=""
      >
        Role:
      </option>
      <Option
        value="Cleric"
        label="Cleric (Account Manager)"
        currentRole={value}
      />
      <Option
        value="Scribe"
        label="Scribe (Content Creator)"
        currentRole={value}
      />
      <Option value="Monk" label="Monk (Project Manager)" currentRole={value} />
      <Option value="Ranger" label="Ranger (UX Designer)" currentRole={value} />
      <Option
        value="Tavern Keeper"
        label="Tavern Keeper (Community Manager)"
        currentRole={value}
      />
      <Option
        value="Alchemist"
        label="Alchemist (DAO Consultant)"
        currentRole={value}
      />
      <Option
        value="Hunter"
        label="Hunter (Business Development)"
        currentRole={value}
      />
      <Option
        value="Rogue"
        label="Rogue (Legal Engineer)"
        currentRole={value}
      />
      <Option
        value="Warrior"
        label="Warrior (Front End Developer)"
        currentRole={value}
      />
      <Option
        value="Paladin"
        label="Paladin (Backend Developer)"
        currentRole={value}
      />
      <Option
        value="Archer"
        label="Archer (Visual Designer)"
        currentRole={value}
      />
      <Option
        value="Necromancer"
        label="Necromancer (Dev Ops)"
        currentRole={value}
      />
      <Option value="Druid" label="Druid (Data Science)" currentRole={value} />
      <Option
        value="Wizard"
        label="Wizard (Smart Contract Developer)"
        currentRole={value}
      />
    </Select>
  );
}

const Option = (props) => {
  const { currentRole, value, label } = props;

  return (
    <>
      {currentRole == value ? (
        <option
          style={{
            backgroundColor: `rgba(10, 10, 10, 0.960784)`,
            color: `#ff3864`,
          }}
          value={value}
          selected
        >
          {label}
        </option>
      ) : (
        <option
          style={{
            backgroundColor: `rgba(10, 10, 10, 0.960784)`,
            color: `#ff3864`,
          }}
          value={value}
        >
          {label}
        </option>
      )}
    </>
  );
};
