/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

registerBlockType( 'sa-gutenberg-addons/container', {
    title: __( 'Custom Container', 'sa-gutenberg-addons' ),
    description: __( 'Provide custom container.', 'sa-gutenberg-addons' ),
    keywords: [
        __( 'container' ),
        __( 'wrapper' ),
        __( 'section' ),
    ],

    supports: {
        align: [ 'wide', 'full' ],
        anchor: true,
        html: false,
    },
    category: 'common',
    icon: 'editor-kitchensink',
    attributes: {
        content: {
            type: 'string',
        },
    },

    edit: ( props ) => {
        const { className } = props;

        return (
            <div className={ className }>
                <InnerBlocks renderAppender={ InnerBlocks.ButtonBlockAppender } />
            </div>
        );
    },

    save: ( props ) => {
        const { className } = props;

        return (
            <div className={ className }>
                <InnerBlocks.Content />
            </div>
        );
    },
} );
