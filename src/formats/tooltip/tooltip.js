/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RichTextToolbarButton, RichTextShortcut } = wp.blockEditor;
const { registerFormatType, toggleFormat, applyFormat, removeFormat, getActiveFormat } = wp.richText;
const {  useState, useEffect } = wp.element;
const { Tooltip, TextControl } = wp.components;
const { useSelect, useDispatch } = wp.data;

const TooltipButton = ({ isActive, value, onChange }) => {
    const [tooltipText, setTooltipText] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const activeTooltip = getActiveFormat(value, 'sa-gutenberg-addons/tooltip');
    const addOrRemoveTooltip = () => {
        if (activeTooltip) {
            onChange(toggleFormat(value, {
                type: 'sa-gutenberg-addons/tooltip',
            }));
        } else if (tooltipText) {
            onChange(toggleFormat(value, {
                type: 'sa-gutenberg-addons/tooltip',
                attributes: {
                    'data-tooltip': tooltipText,
                },
            }));
            setTooltipText('');
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    useEffect(() => {
        if (isOpen) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                const tooltipInput = document.getElementById('tooltip-input');
                if (tooltipInput) {
                    tooltipInput.style.top = `${rect.top - tooltipInput.offsetHeight}px`;
                    tooltipInput.style.left = `${rect.left + (rect.width / 2) - (tooltipInput.offsetWidth / 2)}px`;
                }
            }
        }
    }, [isOpen]);

    return (
        <>
            <RichTextToolbarButton
                icon="admin-comments"
                title={ __('Inline Tooltip', 'sa-gutenberg-addons') }
                onClick={addOrRemoveTooltip}
                isActive={ isActive || !!activeTooltip }
            />
            {isOpen && !activeTooltip && (
                <Tooltip text={ __('Enter tooltip text', 'sa-gutenberg-addons') }>
                    <div id="tooltip-input" style={{ position: 'absolute', zIndex: 1000, backgroundColor: 'white', border: '1px solid #000000', borderRadius: '0px', padding: '8px', boxShadow: 'none' }}>
                        <TextControl
                            label={ __('Tooltip Text', 'sa-gutenberg-addons') }
                            value={ tooltipText }
                            onChange={ setTooltipText }
                        />
                        <button onClick={ addOrRemoveTooltip } style={{ marginTop: '8px', padding: '10px 15px', backgroundColor: 'black', border: '1px solid black', borderRadius: '0px', color: 'white', fontSize: '12px'  }}>
                            { __('Apply', 'sa-gutenberg-addons') }
                        </button>
                    </div>
                </Tooltip>
            )}
        </>
    );
};

registerFormatType('sa-gutenberg-addons/tooltip', {
    title: __('Inline Tooltip', 'sa-gutenberg-addons'),
    tagName: 'span',
    className: 'has-tooltip',
    attributes: {
        'data-tooltip': 'tooltipText',
    },
    edit: TooltipButton,
});
