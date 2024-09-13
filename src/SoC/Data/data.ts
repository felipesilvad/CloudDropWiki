export interface EngravingsOption {
  readonly engravings: string[];
  readonly effect: string;
  readonly dmg: string;
}

export const Engravings: readonly EngravingsOption[] = [
  {engravings: ["Sword", "Sword"], effect: "When actively attacking [unharmed] enemies, increases Crit by 20%.", dmg:"a"},
  {engravings: ["Wand", "Wand"], effect: "After using a [basic attack], [skill], [strike back], or [assisting attack], gains 1 random [Level 2 Attribute Buff].", dmg:"a"},
  {engravings: ["Pentacle", "Pentacle"], effect: "When [Injured], increases DMG by 5% and decreases the DMG taken by 5%. When [Dying], increases DMG by an additional 10% and decreases the DMG taken by an additional 10%.", dmg:"a"},
  {engravings: ["Cup", "Cup"], effect: "Increases healing effect by 10% and healing received by 10%.", dmg:"a"},
  {engravings: ["Sword", "Wand"], effect: "Before actively attacking, for each 1 tile traversed, increases ATK and DEF by 4%, up to 12%. The effect lasts till the start of the next turn.", dmg:"a"},
  {engravings: ["Sword", "Pentacle"], effect: "When [unharmed], increases ATK and DEF by 12%.", dmg:"a"},
  {engravings: ["Sword", "Cup"], effect: "When actively attacking, increases the DMG by 5% and grants 15% of [Life Steal].", dmg:"a"},
  {engravings: ["Wand", "Pentacle"], effect: "Decreases physical DMG taken by 15%.", dmg:"a"},
  {engravings: ["Wand", "Cup"], effect: "At the end of the turn, there is a 50% chance to gain [Engraving Resonance]. Effect: When using an [active skill] next time, refunds the NRG consumed and resets the CD. The skill effect has a CD of 4. turns. (Does not trigger in real-time combat. The effect changes to increasing HP, ATK and DEF by 5%)", dmg:"a"},
  {engravings: ["Pentacle", "Cup"], effect: "Decreases magical DMG taken by 15%.", dmg:"Magical"},
]


export interface StatsOption {
  readonly values: string[];
  readonly label: string;
}

export const EngravingStats: readonly StatsOption[] = [
  {label: "P.ATK", values: ["120", "160", "80", "120"]},
  {label: "P.ATK %", values: ["15%", "20%", "10%", "15%"]},
  {label: "M.ATK", values: ["120", "160", "80", "120"]},
  {label: "M.ATK %", values: ["15%", "20%", "10%", "15%"]},
  {label: "P.DEF", values: ["60", "40", "80", "60"]},
  {label: "P.DEF %", values: ["15%", "10%", "20%", "15%"]},
  {label: "M.DEF", values: ["60", "40", "80", "60"]},
  {label: "M.DEF %", values: ["15%", "10%", "20%", "15%"]},
  {label: "HP", values: ["300", "200", "400", "300"]},
  {label: "HP %", values: ["15%", "10%", "20%", "15%"]},
]


