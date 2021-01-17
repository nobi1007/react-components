# Sourced from -> https://developer.mozilla.org/en-US/docs/Web/SVG/Element#SVG_elements
svgElementNames = [
    "a",
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animate",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "audio",
    "canvas",
    "circle",
    "clipPath",
    "colorProfile",
    "cursor",
    "defs",
    "desc",
    "discard",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "font",
    "fontFace",
    "fontFaceFormat",
    "fontFaceName",
    "fontFaceSrc",
    "fontFaceUri",
    "foreignObject",
    "g",
    "glyph",
    "glyphRef",
    "hatch",
    "hatchpath",
    "hkern",
    "iframe",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "mesh",
    "meshgradient",
    "meshpatch",
    "meshrow",
    "metadata",
    "missingGlyph",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "script",
    "set",
    "solidcolor",
    "stop",
    "style",
    "svg",
    "switch",
    "symbol",
    "text",
    "textPath",
    "title",
    "tref",
    "tspan",
    "unknown",
    "use",
    "video",
    "view",
    "vkern",
]


def getFuncDefs():
    for element in svgElementNames:
        tagName = element.title()
        print()
        print(
            """
            export const %s = (props) => {
            return <%s {...props}>{props.children
            }</%s>;
            };
            """
            % (tagName, element, element)
        )
        print()


def getFuncMappings():
    for element in svgElementNames:
        print()
        print(
            """
            %s: (props) => {
            return <%s {...props}> \{props.children\} </%s>;},
            """
            % (element, element, element)
        )
        print()


# getFuncDefs()
getFuncMappings()