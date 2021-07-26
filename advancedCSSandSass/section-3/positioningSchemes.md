# Positioning schemes


- # Normal flow

    - Default positioning scheme
    - NOT floated
    - NOT absolute positioned
    - Elements laid out according to their source order
    - (default) position: relative;


- # Floats

    - Element is removed from normal flow
    - Text and inline elements will wrap around the float element
    - The container will not adjust its height to the element
    - float: left;
    - float: right;


- # Absolute positioning

    - Element is removed from the normal flow
    - NO impact on surrounding content or element
    - We use top, bottom, left and right to offset the element from its relatively positioned container.
    - position: absolute;
    - position: fixed;